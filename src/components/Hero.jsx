import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Herocontrol() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="flex-1 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video src="./1107.mp4" autoPlay loop muted className="w-full h-full object-cover"></video>
      </div>

      {/* Flashlight effect using masking */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'black', // Dark background to hide the sides
          maskImage: `radial-gradient(circle 300px at ${cursorPos.x}px ${cursorPos.y}px, transparent 60%, black 100%)`, // Mask for the flashlight effect
          WebkitMaskImage: `radial-gradient(circle 300px at ${cursorPos.x}px ${cursorPos.y}px, transparent 60%, black 100%)`, // Webkit support
          filter: 'blur(50px)', // Apply blur effect for smooth edges
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center h-full z-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-7xl bg-clip-text bg-gradient-to-r from-white via-gray-500 to-blue-500 animate-gradient-text mb-4"
        >
          Animation Controller
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-2xl text-white max-w-3xl"
        >
          Unleash the power of animations with our cutting-edge controller. Create stunning, interactive user experiences with ease.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          href="#"
          className="animate-gradient font-semibold py-3 px-6 rounded-full flex items-center justify-center mt-10"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(15,23,42,1) 100%)', 
            backgroundSize: '200% 200%',
            animation: 'gradientAnimation 3s ease infinite',
          }}
        >
          Get started
        </motion.a>
      </div>
    </main>
  )
}
