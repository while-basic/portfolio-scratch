"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { AudioEffectsProcessor } from '@/components/audio/AudioEffectsProcessor'
import { Button } from '@/components/ui/button'

interface AudioVisualizerProps {
  mode?: 'bars' | 'circular' | 'wave'
}

function AudioBars({ audioData, mode = 'bars' }: { audioData: Uint8Array; mode?: 'bars' | 'circular' | 'wave' }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const waveformRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Line>(null)
  const tempObject = new THREE.Object3D()
  const count = audioData.length
  const color = new THREE.Color()

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime()

    if (mode === 'bars' || mode === 'circular') {
      for (let i = 0; i < count; i++) {
        const value = audioData[i] / 255
        
        if (mode === 'bars') {
          // Standard bar visualization
          tempObject.position.set(
            (i - count / 2) * 0.1,
            value * 2,
            0
          )
          tempObject.scale.set(0.05, value * 4 + 0.1, 0.05)
        } else {
          // Circular visualization
          const angle = (i / count) * Math.PI * 2
          const radius = 2 + value * 0.5
          tempObject.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
          tempObject.scale.set(0.05, 0.2, value * 2)
          tempObject.rotation.z = angle
        }
        
        // Color based on frequency and time
        color.setHSL((i / count + time * 0.1) % 1, 0.8, 0.5)
        meshRef.current.setColorAt(i, color)
        
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(i, tempObject.matrix)
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true
      if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    }

    // Update waveform if in wave mode
    if (mode === 'wave' && lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const value = audioData[i] / 255
        positions[i * 3 + 1] = value * 2 // Y position
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const createWaveform = () => {
    if (mode !== 'wave') return null

    const points = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      points[i * 3] = (i - count / 2) * 0.1 // X
      points[i * 3 + 1] = 0 // Y
      points[i * 3 + 2] = 0 // Z
    }

    return (
      <group ref={waveformRef}>
        <primitive object={new THREE.Line()} ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={count}
              array={points}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4fa6d8" linewidth={2} />
        </primitive>
      </group>
    )
  }

  return (
    <>
      {mode === 'wave' ? createWaveform() : (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
          <boxGeometry />
          <meshPhongMaterial />
        </instancedMesh>
      )}
    </>
  )
}

export function AudioVisualizer({ mode = 'bars' }: AudioVisualizerProps) {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128).fill(0))
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const audioContext = useRef<AudioContext>()
  const sourceNode = useRef<MediaStreamAudioSourceNode>()
  const analyser = useRef<AnalyserNode>()
  const mediaRecorder = useRef<MediaRecorder>()
  const animationFrame = useRef<number>()
  const mediaStream = useRef<MediaStream>()
  const processedStream = useRef<MediaStream>()
  const destinationNode = useRef<MediaStreamAudioDestinationNode>()

  const startRecording = async () => {
    try {
      console.log('Starting recording...')
      // Reset previous recording
      setRecordedChunks([])
      setDownloadUrl(null)

      // Get user media
      mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContext.current = new AudioContext()
      sourceNode.current = audioContext.current.createMediaStreamSource(mediaStream.current)
      analyser.current = audioContext.current.createAnalyser()
      analyser.current.fftSize = 256

      // Create destination node for recording processed audio
      destinationNode.current = audioContext.current.createMediaStreamDestination()
      
      // Set up MediaRecorder for the processed audio
      mediaRecorder.current = new MediaRecorder(destinationNode.current.stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorder.current.ondataavailable = (event) => {
        console.log('Data available:', event.data.size)
        if (event.data.size > 0) {
          setRecordedChunks(chunks => {
            console.log('Adding chunk, total chunks:', chunks.length + 1)
            return [...chunks, event.data]
          })
        }
      }

      mediaRecorder.current.onstop = () => {
        console.log('MediaRecorder stopped, chunks:', recordedChunks.length)
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: 'audio/webm;codecs=opus' })
          const url = URL.createObjectURL(blob)
          console.log('Created download URL:', url)
          setDownloadUrl(url)
        }
      }

      setIsRecording(true)
      mediaRecorder.current.start()
      console.log('MediaRecorder started')
    } catch (err) {
      console.error('Error starting recording:', err)
    }
  }

  const stopRecording = () => {
    console.log('Stopping recording...')
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      console.log('MediaRecorder state:', mediaRecorder.current.state)
      mediaRecorder.current.stop()
    }

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    if (audioContext.current) {
      audioContext.current.close()
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop())
    }
    if (processedStream.current) {
      processedStream.current.getTracks().forEach(track => track.stop())
    }

    setIsRecording(false)
    setAudioData(new Uint8Array(128).fill(0))
  }

  const handleProcessedNode = (processedNode: AudioNode) => {
    if (!analyser.current || !destinationNode.current) return
    
    // Connect the processed node to both analyzer and destination
    processedNode.connect(analyser.current)
    processedNode.connect(destinationNode.current)
    
    // Start the visualization loop
    const updateData = () => {
      const dataArray = new Uint8Array(analyser.current!.frequencyBinCount)
      analyser.current!.getByteFrequencyData(dataArray)
      setAudioData(dataArray)
      animationFrame.current = requestAnimationFrame(updateData)
    }
    
    updateData()
  }

  // Cleanup effect
  useEffect(() => {
    const currentProcessedStream = processedStream.current
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      if (audioContext.current) {
        audioContext.current.close()
      }
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach(track => track.stop())
      }
      if (currentProcessedStream) {
        currentProcessedStream.getTracks().forEach(track => track.stop())
      }
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
      }
    }
  }, [downloadUrl])

  // Effect to handle recordedChunks updates
  useEffect(() => {
    console.log('recordedChunks updated:', recordedChunks.length)
  }, [recordedChunks])

  // Effect to handle downloadUrl updates
  useEffect(() => {
    console.log('downloadUrl updated:', downloadUrl)
  }, [downloadUrl])

  return (
    <div className="w-full space-y-4">
      <div className="h-[400px] relative">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AudioBars audioData={audioData} mode={mode} />
          <OrbitControls enableZoom={false} />
        </Canvas>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="flex gap-2">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
            </Button>
            
            {downloadUrl && !isRecording && (
              <Button
                asChild
                variant="outline"
              >
                <a href={downloadUrl} download="processed-audio.webm">
                  💾 Download Recording
                </a>
              </Button>
            )}
          </div>
          
          <div className="bg-background/80 backdrop-blur-sm p-2 rounded-lg text-sm mt-2">
            <p>🎵 {isRecording ? 'Recording audio...' : downloadUrl ? 'Ready to download!' : 'Click Start to begin'}</p>
          </div>
        </div>
      </div>

      {/* Audio Effects */}
      {isRecording && audioContext.current && sourceNode.current && (
        <AudioEffectsProcessor
          audioContext={audioContext.current}
          sourceNode={sourceNode.current}
          onProcessedNode={handleProcessedNode}
        />
      )}
    </div>
  )
}
