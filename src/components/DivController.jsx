import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, RefreshCw } from 'lucide-react';

const AnimationController = () => {
  const [animationProps, setAnimationProps] = useState({
    animate: { x: 0, y: 0, rotate: 180, scale: 1, opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
    initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
    exit: { x: -100, y: -100, rotate: -180, scale: 0.5, opacity: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
    transition: { duration: 1, ease: 'easeInOut', loop: 0, repeatDelay: 0, repeat: false },
    whileHover: { scale: 1.5, rotate: 360, skewX: 0, skewY: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 },
    whileTap: { scale: 0.9, rotate: -10 },
    drag: { drag: false, dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 } }
  });
  const [activeCategories, setActiveCategories] = useState({
    animate: true,
    initial: true,
    exit: false,
    transition: false,
    whileHover: false,
    whileTap: false,
    drag: false
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const handleInputChange = (category, property, value) => {
    setAnimationProps(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: isNaN(value) ? value : parseFloat(value)
      }
    }));
  };

  const toggleCategory = (category) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleDrag = () => {
    setAnimationProps(prev => ({
      ...prev,
      drag: { ...prev.drag, drag: !prev.drag.drag }
    }));
  };

  const generateCode = () => {
    let code = `<motion.div`;

    for (const category in activeCategories) {
      if (activeCategories[category]) {
        code += `
  ${category}=${JSON.stringify(animationProps[category])} `;
      }
    }
    code += `/>`
;
    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
  };

  const resetAnimation = () => {
    setAnimationProps({
      animate: { x: 0, y: 0, rotate: 180, scale: 1, opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
      initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
      exit: { x: -100, y: -100, rotate: -180, scale: 0.5, opacity: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
      transition: { duration: 1, ease: 'easeInOut', loop: 0, repeatDelay: 0, repeat: false },
      whileHover: { scale: 1.5, rotate: 360 },
      whileTap: { scale: 0.9, rotate: -10 },
      drag: { drag: false, dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 } }
    });

    setActiveCategories({
      animate: true,
      initial: true,
      exit: false,
      transition: true,
      whileHover: true,
      whileTap: true,
      drag: true
    });
  };

  const refreshAnimation = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  const text = "Animation Controller";

  

  return (
    <AnimatePresence>
    <div className="p-6 w-full mx-auto flex flex-col bg-white">
    <motion.h1
        className="text-3xl font-bold mb-6"
      >
        {/* Animate each character */}
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }} // Start with the text hidden
            animate={{ opacity: 1 }} // Fade in the character
            transition={{ delay: index * 0.1 }} // Delay based on index to create typing effect
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <div className="flex flex-col gap-6">
        <motion.div 
          animate={{x:0,y:0}}
          initial={{x:0,y:100}} 
          transition={{duration:0.5}}
          className="justify-center flex gap-4">
          {Object.entries(animationProps).map(([category, properties]) => (
            <div key={category} className="border p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={activeCategories[category]}
                  onChange={() => toggleCategory(category)}
                  className="mr-2"
                />
                <h2 className="text-xl font-semibold capitalize">{category}</h2>
              </div>
              {Object.entries(properties).map(([prop, value]) => (
                <div key={prop} className="mb-2">
                  <label htmlFor={`${category}-${prop}`} className="block text-sm font-medium text-gray-700">
                    {prop}
                  </label>
                  <input
                    id={`${category}-${prop}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(category, prop, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              {category === "drag" && (
                <button
                  onClick={toggleDrag}
                  className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm"
                >
                  {animationProps.drag.drag ? "Disable Drag" : "Enable Drag"}
                </button>
              )}
            </div>
          ))}
        </motion.div>
        <div className="space-y-4 ">
          <div className="border p-4 rounded-lg h-64 flex flex-col gap-6 items-center justify-center bg-gray-100">
            <motion.div
              key={refreshKey} // Use refreshKey to force re-mount
              animate={activeCategories.animate ? animationProps.animate : {}}
              initial={activeCategories.initial ? animationProps.initial : {}}
              exit={activeCategories.exit ? animationProps.exit : {}}
              transition={activeCategories.transition ? animationProps.transition : {}}
              whileHover={activeCategories.whileHover ? animationProps.whileHover : {}}
              whileTap={activeCategories.whileTap ? animationProps.whileTap : {}}
              drag={activeCategories.drag ? animationProps.drag.drag : false}
              dragConstraints={activeCategories.drag ? animationProps.drag.dragConstraints : undefined}
              className="w-32 h-32 bg-black"
            />
            <button
              onClick={refreshAnimation}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="w-4 h-4 mr-2 text-center" />
            </button>
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Generated Code</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              {generateCode()}
            </pre>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Code
            </button>
            <button
              onClick={resetAnimation}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Animation
            </button>

          </div>
        </div>
      </div>
    </div>
    </AnimatePresence>
  );
};

export default AnimationController;
