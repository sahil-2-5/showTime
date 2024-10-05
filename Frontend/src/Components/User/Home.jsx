import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Slider from "./Slider";

const Home = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleAnimationComplete = () => {
    // Logic for when the animation completes, if needed
  };

  return (
    <>
      <div className="bg-white">
        <div className="h-screen w-full overflow-hidden bg-zinc-900 ">
          {/* Navbar Animation */}
          <motion.div
            initial={{ y: -100, opacity: 0 }} // Start offscreen and invisible
            animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
            transition={{ duration: 1, ease: "easeOut" }} // Slow falling effect
          >
            <Navbar />
          </motion.div>

          {/* Slider Animation */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }} // Start from right and invisible
            animate={{ x: 0, opacity: 1 }} // Slide to normal position and become visible
            transition={{ duration: 1, ease: "easeOut" }} // Slide-in effect
          >
            <motion.div
              initial={{ y: 10, opacity: 1 }} // Start slightly below and transparent
              animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }} // Loop animation
            >
              <Slider autoSlide={true} />
            </motion.div>
          </motion.div>

          <div className="textstructure absolute font-londrina text-white mt-[225px] px-[160px] shadow-red-500">
            {["Book Your", "Ticket", "Now"].map((item, index) => {
              return (
                <div className="masker" key={index}>
                  <div className="flex">
                    {index === 1 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "10vw" }}
                        transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }}
                        className="w-[8vw] h-[5.3vw] mt-4 ml-2 mr-2"
                      >
                        <motion.div
                          initial={{ y: 10, opacity: 1 }} // Start slightly below and transparent
                          animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }} // Loop animation
                        >
                          <img
                            className="h-full w-full bg-none rounded-md"
                            src="https://i.pinimg.com/564x/70/5b/aa/705baaf53f86c52cc60db190745c038c.jpg"
                            alt="Ticket"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                    <h1
                      className="text-[7.5vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
                      style={{ textShadow: "4px 4px 0 red" }} // Adding red shadow
                    >
                      <motion.div
                        initial={{ y: 10, opacity: 1 }} // Start slightly below and transparent
                        animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }} // Loop animation
                      >
                        {item}
                      </motion.div>
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="textstructure font-londrina text-white">
            <div className="flex justify-center">
              <h1
                className="fixed bottom-0 z-50 text-[1.0vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
                style={{ textShadow: "2px 2px 0 red" }} // Adding red shadow
              >
                <motion.div
                  initial={{ y: 10, opacity: 1 }} // Start slightly below and transparent
                  animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }} // Loop animation
                >
                  Scroll Down
                </motion.div>
              </h1>
            </div>
          </div>

          <div>
            <motion.div
              className="eye absolute flex top-[255px] left-[230px] -translate-x-[50%] -translate-y-[50%]"
              initial={{ opacity: 0, scale: 0 }} // Start with invisible and small scale
              animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }} // Smooth transition with spring effect
              onAnimationComplete={handleAnimationComplete} // Trigger on animation complete
            >
              {/* Eye Component */}
              <motion.div
                initial={{ y: 10, opacity: 1 }} // Start slightly below and transparent
                animate={{ y: 0, opacity: 1 }} // Move to normal position and become visible
                className="flex"
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }} // Loop animation
              >
                {Array.from({ length: 2 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-center items-center w-[4vw] h-[4vw] rounded-full bg-white"
                    initial={{ opacity: 0, scale: 0 }} // Initial state for eye elements
                    animate={{ opacity: 1, scale: 1 }} // Animate to full visibility and scale
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2, // Staggered appearance
                      ease: "easeOut",
                    }} // Delay for staggered effect
                  >
                    <div className="relative w-2/3 h-2/3 rounded-full bg-zinc-900">
                      <div
                        style={{
                          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                        }}
                        className="line p-1 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10"
                      >
                        <div className="w-5 h-5 rounded-full bg-zinc-100"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
