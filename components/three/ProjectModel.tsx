"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Float, Html } from '@react-three/drei'
import { Suspense, useState } from 'react'

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url)
  const [hovered, setHovered] = useState(false)
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive 
        object={scene} 
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      {hovered && (
        <Html position={[0, 1, 0]}>
          <div className="bg-black/80 text-white p-2 rounded-lg text-sm">
            Click and drag to rotate
          </div>
        </Html>
      )}
    </Float>
  )
}

interface ProjectModelProps {
  modelUrl: string
  scale?: number
  title?: string
  description?: string
}

export function ProjectModel({ modelUrl, scale, title, description }: ProjectModelProps) {
  return (
    <div className="relative w-full h-[500px]">
      {title && (
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-xl font-bold">{title}</h3>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Suspense fallback={null}>
          <Model url={modelUrl} scale={scale} />
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
