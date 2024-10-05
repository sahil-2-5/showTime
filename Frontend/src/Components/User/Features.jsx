import { motion } from "framer-motion";
import React, { useState } from "react";

const Features = () => {
  const [isHovering, setHovering] = useState(false);

  return (
    <>
      <div className="w-full h-screen py-5 overflow-hidden bg-zinc-600">
        <div className="textstructure font-londrina text-white">
          <div className="flex justify-center">
            <h1
              className="text-[6.0vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
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
                Future Project
              </motion.div>
            </h1>
          </div>
        </div>
        <div className="px-20">
          <div className="cards w-full flex justify-center items-center gap-10 mt-10">
            <div className="cardcontainer relative w-1/2 h-[35vw]">
              <h1 className="absolute flex overflow-hidden z-[9] text-zinc-200 text-6xl p-3 font-bold leading-none tracking-tighter ">
                {"ANDROID".split("").map((items, index) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={isHovering ? { y: "0" } : { y: "100%" }}
                    transition={{
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1,
                    }}
                    className="inline-block"
                  >
                    {items}
                  </motion.span>
                ))}
              </h1>

              <div className="w-full h-full rounded-xl overflow-hidden ">
                <img
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="h-full w-full bg-cover"
                  src="https://i.pinimg.com/564x/79/9b/34/799b34702fc772b621c4432bc74c1dc6.jpg"
                ></img>
              </div>
            </div>
            <div className="cardcontainer relative w-1/2 h-[35vw]">
              <h1 className="absolute flex overflow-hidden  z-[9] text-red-600 text-6xl font-bold p-3 leading-none tracking-tighter right-5">
                {"APP".split("").map((items, index) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={isHovering ? { y: "0" } : { y: "100%" }}
                    transition={{
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1,
                    }}
                    className="inline-block"
                  >
                    {items}
                  </motion.span>
                ))}
              </h1>

              <div className="w-full h-full overflow-hidden rounded-xl ">
                <img
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="h-full w-full object-cover"
                  src="https://i.pinimg.com/originals/3f/3d/8e/3f3d8e6576ef598625b289eae8fabfa7.gif"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
