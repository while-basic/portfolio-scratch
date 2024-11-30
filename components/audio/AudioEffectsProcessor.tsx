"use client"

import { useEffect, useState, useCallback } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AudioEffect {
  type: string
  node: AudioNode
  params: { [key: string]: AudioParam }
  bypass: boolean
}

interface AudioEffectsProcessorProps {
  audioContext: AudioContext | null
  sourceNode: MediaStreamAudioSourceNode | null
  onProcessedNode?: (node: AudioNode) => void
}

export function AudioEffectsProcessor({ 
  audioContext, 
  sourceNode,
  onProcessedNode 
}: AudioEffectsProcessorProps) {
  const [effects, setEffects] = useState<AudioEffect[]>([])
  const [selectedPreset, setSelectedPreset] = useState("default")
  
  const presets = {
    default: {
      distortion: 0,
      reverb: 0.3,
      delay: 0.2,
      filter: 2000
    },
    warm: {
      distortion: 2,
      reverb: 0.4,
      delay: 0.3,
      filter: 1000
    },
    bright: {
      distortion: 1,
      reverb: 0.2,
      delay: 0.1,
      filter: 4000
    }
  }

  // Create convolution reverb buffer
  const createReverbBuffer = useCallback(async () => {
    if (!audioContext) return null
    
    const length = audioContext.sampleRate * 2 // 2 seconds
    const impulseBuffer = audioContext.createBuffer(2, length, audioContext.sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulseBuffer.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length / 3))
      }
    }
    
    return impulseBuffer
  }, [audioContext])

  // Create distortion curve
  const createDistortionCurve = (amount: number) => {
    const samples = 44100
    const curve = new Float32Array(samples)
    const deg = Math.PI / 180

    for (let i = 0; i < samples; ++i) {
      const x = (i * 2) / samples - 1
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }

    return curve
  }

  // Connect all effects in the chain
  const connectEffectsChain = useCallback(() => {
    if (!audioContext || !sourceNode || effects.length === 0) return

    let previousNode: AudioNode = sourceNode

    effects.forEach((effect) => {
      if (!effect.bypass) {
        previousNode.connect(effect.node)
        previousNode = effect.node
      }
    })

    // Connect the last effect to the destination
    if (onProcessedNode) {
      onProcessedNode(previousNode)
    } else {
      previousNode.connect(audioContext.destination)
    }
  }, [audioContext, sourceNode, effects, onProcessedNode])

  // Initialize effects chain
  const initializeEffects = useCallback(async () => {
    if (!audioContext || !sourceNode) return

    // Create effects nodes
    const distortion = audioContext.createWaveShaper()
    const filter = audioContext.createBiquadFilter()
    const delay = audioContext.createDelay()
    const reverb = audioContext.createConvolver()
    const reverbBuffer = await createReverbBuffer()
    if (reverbBuffer) reverb.buffer = reverbBuffer

    // Configure initial effect settings
    distortion.curve = createDistortionCurve(0)
    filter.type = 'lowpass'
    filter.frequency.value = 2000
    delay.delayTime.value = 0.2

    // Create gain nodes for wet/dry mixing
    const distortionGain = audioContext.createGain()
    const reverbGain = audioContext.createGain()
    const delayGain = audioContext.createGain()
    const filterGain = audioContext.createGain()

    setEffects([
      {
        type: 'distortion',
        node: distortion,
        params: {
          amount: { value: 0 } as unknown as AudioParam,
          gain: distortionGain.gain
        },
        bypass: false
      },
      {
        type: 'filter',
        node: filter,
        params: {
          frequency: filter.frequency,
          gain: filterGain.gain
        },
        bypass: false
      },
      {
        type: 'delay',
        node: delay,
        params: {
          time: delay.delayTime,
          gain: delayGain.gain
        },
        bypass: false
      },
      {
        type: 'reverb',
        node: reverb,
        params: {
          gain: reverbGain.gain
        },
        bypass: false
      }
    ])

    // Connect the effects chain
    connectEffectsChain()
  }, [audioContext, sourceNode, createReverbBuffer, connectEffectsChain])

  // Update effect parameters
  const updateEffect = (effectType: string, paramName: string, value: number) => {
    const newEffects = effects.map(effect => {
      if (effect.type === effectType) {
        if (effect.type === 'distortion') {
          (effect.node as WaveShaperNode).curve = createDistortionCurve(value)
        } else {
          effect.params[paramName].value = value
        }
      }
      return effect
    })

    setEffects(newEffects)
    connectEffectsChain()
  }

  // Toggle effect bypass
  const toggleBypass = (effectType: string) => {
    const newEffects = effects.map(effect => {
      if (effect.type === effectType) {
        return { ...effect, bypass: !effect.bypass }
      }
      return effect
    })

    setEffects(newEffects)
    connectEffectsChain()
  }

  // Apply preset
  const applyPreset = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets]
    setSelectedPreset(presetName)

    updateEffect('distortion', 'amount', preset.distortion)
    updateEffect('reverb', 'gain', preset.reverb)
    updateEffect('delay', 'time', preset.delay)
    updateEffect('filter', 'frequency', preset.filter)
  }

  // Initialize effects when context and source are available
  useEffect(() => {
    if (audioContext && sourceNode) {
      initializeEffects()
    }
  }, [audioContext, sourceNode, initializeEffects])

  if (!audioContext || !sourceNode) return null

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Audio Effects</h3>
          <Select value={selectedPreset} onValueChange={applyPreset}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="bright">Bright</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {effects.map((effect) => (
          <div key={effect.type} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="capitalize">{effect.type}</Label>
              <Switch
                checked={!effect.bypass}
                onCheckedChange={() => toggleBypass(effect.type)}
              />
            </div>

            {!effect.bypass && (
              <div className="space-y-4">
                {Object.entries(effect.params).map(([param, audioParam]) => (
                  <div key={param} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm capitalize">{param}</Label>
                      <span className="text-sm text-muted-foreground">
                        {audioParam.value.toFixed(2)}
                      </span>
                    </div>
                    <Slider
                      value={[audioParam.value]}
                      min={param === 'frequency' ? 20 : 0}
                      max={param === 'frequency' ? 20000 : 1}
                      step={param === 'frequency' ? 100 : 0.01}
                      onValueChange={([value]) => updateEffect(effect.type, param, value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
