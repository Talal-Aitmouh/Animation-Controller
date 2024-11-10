import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Play, ArrowDownCircle, Loader, Type } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export default function HomeControl() {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref)

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const [hoverText, setHoverText] = useState('');

    const handleMouseEnter = (text) => {
        setHoverText(text);
    };

    const handleMouseLeave = () => {
        setHoverText('');
    };

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <nav className="bg-black shadow-md p-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link to="/">
                                        <span className="text-2xl font-bold text-gray-100">NexaDev</span></Link>

                                </motion.div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-8">
                            <Link to="/text">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    onMouseEnter={() => handleMouseEnter('Text Animation')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Type className="text-gray-100 cursor-pointer" />
                                </motion.div></Link>

                            <Link to="/div">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="w-8 h-8 bg-gray-100 rounded-full cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter('Div Animation')}
                                    onMouseLeave={handleMouseLeave}
                                ></motion.div></Link>

                            <Link to="/scroll">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    onMouseEnter={() => handleMouseEnter('Animation on Scroll')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ArrowDownCircle className="text-gray-100 cursor-pointer" />
                                </motion.div></Link>
                            <Link  to="/loading">

                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    onMouseEnter={() => handleMouseEnter('Loading Animation')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Loader className="text-gray-100 cursor-pointer" />
                                </motion.div>
                            </Link>
                            

                            {/* Display hover text */}
                            {hoverText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bg-white text-indigo-600 p-2 rounded shadow-md"
                                >
                                    {hoverText}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>

    )
}