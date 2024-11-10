import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, X } from 'lucide-react'

const LoadingAnimation = ({ size = 10, color = 'blue-500' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState('')

  const animations = {
    spinner: (
      <motion.div
        className={`w-${size} h-${size} border-4 border-${color} border-t-4 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    ),
    pulse: (
      <motion.div
        className={`w-${size} h-${size} rounded-full bg-${color}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    ),
    dots: (
      <motion.div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-${color}`}
            animate={{ y: ['0%', '-100%', '0%'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    ),
    wave: (
      <motion.div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className={`w-1 h-8 bg-${color}`}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
    ),
    circle: (
      <svg width="30px" height="30px" viewBox="0 0 50 50">
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke={`currentColor`}
          strokeWidth="4"
          fill="none"
          className={`text-${color}`}
          strokeDasharray="0 1"
          animate={{
            strokeDasharray: ["1 200", "89 200", "89 200"],
            strokeDashoffset: [0, -35, -124],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    ),
    bounce: (
      <motion.div
        className={`w-${size} h-${size } rounded-full bg-${color}`}
        animate={{
          y: ['0%', '-50%'],
          boxShadow: [
            '0 0 0 rgba(0, 0, 0, 0)',
            '0 20px 30px rgba(0, 0, 0, 0.2)'
          ]
        }}
        transition={{
          y: {
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeOut'
          },
          boxShadow: {
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeOut'
          }
        }}
      />
    ),
  }

  const handleClick = (animationName) => {
    setSelectedAnimation(animationName)
    setIsModalOpen(true)
  }

  const animationCode = {
    spinner: `<motion.div
  className="w-10 h-10 border-4 border-blue-500 border-t-4 border-t-transparent rounded-full"
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
/>`,
    pulse: `<motion.div
  className="w-10 h-10 rounded-full bg-blue-500"
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
/>`,
    dots: `<motion.div className="flex gap-2">
  {[0, 1, 2].map((index) => (
    <motion.div
      key={index}
      className="w-3 h-3 rounded-full bg-blue-500"
      animate={{ y: ['0%', '-100%', '0%'] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.2,
      }}
    />
  ))}
</motion.div>`,
    wave: `<motion.div className="flex gap-1">
  {[0, 1, 2, 3, 4].map((index) => (
    <motion.div
      key={index}
      className="w-1 h-8 bg-blue-500"
      animate={{ scaleY: [1, 1.5, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.1,
      }}
    />
  ))}
</motion.div>`,
    circle: `<svg width="50" height="50" viewBox="0 0 50 50">
  <motion.circle
    cx="25"
    cy="25"
    r="20"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
    className="text-blue-500"
    strokeDasharray="0 1"
    animate={{
      strokeDasharray: ["1 200", "89 200", "89 200"],
      strokeDashoffset: [0, -35, -124],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</svg>`,
    bounce: `<motion.div
  className="w-5 h-5 rounded-full bg-blue-500"
  animate={{
    y: ['0%', '-50%'],
    boxShadow: [
      '0 0 0 rgba(0, 0, 0, 0)',
      '0 20px 30px rgba(0, 0, 0, 0.2)'
    ]
  }}
  transition={{
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeOut'
    },
    boxShadow: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeOut'
    }
  }}
/>`
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y:100 }} animate={{ opacity: 1, y:0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Object.entries(animations).map(([name, animation]) => (
          <div
            key={name}
            className="flex flex-col justify-center items-center w-full h-60 border-2 border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleClick(name)}
          >
            <h4 className="text-lg font-semibold mb-4 capitalize">{name}</h4>
            {animation}
            <button className="mt-4 flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300">
              <Code className="mr-2 h-4 w-4" />
              View Code
            </button>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedAnimation} Animation Code</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{animationCode[selectedAnimation]}</code>
              </pre>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LoadingAnimation