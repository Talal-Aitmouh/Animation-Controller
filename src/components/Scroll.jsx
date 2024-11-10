import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ScrollAnimation() {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);
  
  const [animationProps, setAnimationProps] = useState({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  });

  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollTop;
    setScrollY(scrollPosition);

    if (scrollPosition > 100) {
      controls.start(animationProps.animate);
    } else {
      controls.start(animationProps.initial);
    }
  };

  const handleInputChange = (category, property, value) => {
    setAnimationProps(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: isNaN(value) ? value : parseFloat(value)
      }
    }));
  };

  const generateCode = () => {
    let code = `<motion.div`;

    for (const category in animationProps) {
      
        code += `
  ${category}=${JSON.stringify(animationProps[category])} `;
      
    }
    code += `/>`
;
    return code;
  };

  useEffect(() => {
    controls.start(animationProps.initial);
  }, [controls, animationProps.initial]);

  const text = "Animation On Scroll"

  return (
    <div className="p-8 w-full  bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
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
      
      <motion.div
      initial={{opacity:0, y:100}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(animationProps).map(([category, properties]) => (
          <div key={category} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-700">{category}</h2>
            {Object.entries(properties).map(([prop, value]) => (
              <div key={prop} className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">{prop}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(category, prop, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
      
      <div
        onScroll={handleScroll}
        className="border-4 border-gray-200 w-[50%] p-6 rounded-lg h-96 mx-auto overflow-y-scroll bg-white shadow-inner"
      >
        <div className="h-[800px]  relative bg-gradient-to-b from-gray-50 to-gray-100">
          <motion.div
            animate={controls}
            initial={animationProps.initial}
            transition={animationProps.transition}
            className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white font-bold text-lg flex items-center justify-center mx-auto mt-60 shadow-lg"
          >
            Scroll to Animate
          </motion.div>
        </div>
      </div>
      <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Generated Code</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              {generateCode()}
            </pre>
          </div>
    </div>
  );
}