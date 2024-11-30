"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Stars, Html } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

const skills = {
  software: ['React', 'Node.js', 'Python', 'TypeScript', 'Next.js'],
  mechatronics: ['PLC', 'Arduino', 'Sensors', 'Robotics', 'CAD'],
  audio: ['Pro Tools', 'Mixing', 'Recording', 'Sound Design', 'DSP']
}

interface SkillNodeProps {
  text: string
  position: [number, number, number]
  color: string
  category?: string
}

function SkillNode({ text, position, color, category }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  // Spring animation for hover effect
  const { scale, textColor } = useSpring({
    scale: hovered ? 1.2 : 1,
    textColor: hovered ? '#ffffff' : color,
    config: { tension: 300, friction: 10 }
  })
  
  const springColor = new THREE.Color(textColor.get())
  
  // Particle system around the node
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 10; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ]
      })
    }
    return temp
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <group>
        {/* Particles */}
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position as [number, number, number]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        ))}
        
        {/* Skill text */}
        <animated.group scale={scale}>
          <Text
            position={position}
            fontSize={0.3}
            color={springColor}
            anchorX="center"
            anchorY="middle"
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            {text}
          </Text>
          
          {/* Info popup on click */}
          {clicked && (
            <Html position={[position[0], position[1] + 0.4, position[2]]}>
              <div className="bg-background/90 backdrop-blur-sm p-2 rounded-lg shadow-lg text-sm">
                <p className="font-bold">{text}</p>
                {category && <p className="text-xs text-muted-foreground">Category: {category}</p>}
              </div>
            </Html>
          )}
        </animated.group>
      </group>
    </Float>
  )
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null)
  
  useFrame(({ clock }) => {
    if (linesRef.current) {
      // Animate line opacity based on time
      const material = linesRef.current.material as THREE.LineBasicMaterial
      material.opacity = Math.sin(clock.getElapsedTime() * 2) * 0.3 + 0.7
    }
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={6}
          array={new Float32Array([
            -2, 2, 0,   // Software node
            0, -2, 0,   // Audio node
            -2, 2, 0,   // Software node
            2, 2, 0,    // Mechatronics node
            2, 2, 0,    // Mechatronics node
            0, -2, 0    // Audio node
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#666666" transparent opacity={0.5} />
    </lineSegments>
  )
}

function SkillsGraph() {
  return (
    <>
      {/* Background stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
      
      <ConnectingLines />
      
      {/* Main skill nodes */}
      <SkillNode text="Software" position={[-2, 2, 0]} color="#61dafb" category="Main" />
      <SkillNode text="Mechatronics" position={[2, 2, 0]} color="#ff6b6b" category="Main" />
      <SkillNode text="Audio" position={[0, -2, 0]} color="#ffd93d" category="Main" />
      
      {/* Software skills */}
      {skills.software.map((skill, i) => (
        <SkillNode
          key={skill}
          text={skill}
          position={[-3 + i * 0.8, 3, 0]}
          color="#4fa6d8"
          category="Software"
        />
      ))}
      
      {/* Mechatronics skills */}
      {skills.mechatronics.map((skill, i) => (
        <SkillNode
          key={skill}
          text={skill}
          position={[1 + i * 0.8, 3, 0]}
          color="#e64c4c"
          category="Mechatronics"
        />
      ))}
      
      {/* Audio skills */}
      {skills.audio.map((skill, i) => (
        <SkillNode
          key={skill}
          text={skill}
          position={[-2 + i * 0.8, -3, 0]}
          color="#e6c54c"
          category="Audio"
        />
      ))}
    </>
  )
}

export function SkillsScene() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SkillsGraph />
        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg text-sm">
        <p>🖱️ Click on skills for details</p>
        <p>✋ Drag to rotate view</p>
      </div>
    </div>
  )
}
