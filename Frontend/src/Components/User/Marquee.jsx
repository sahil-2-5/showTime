import React from "react";
import { motion } from 'framer-motion';

const Marquee = () => {
  const textArray = Array(10).fill("Book Now"); // Change 10 to however many times you want to display the text

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      className="w-full h-[450px] py-10 -mt-18 font-lilita rounded-tr-3xl rounded-tl-3xl bg-zinc-600 flex justify-center font-londrina overflow-hidden relative"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        {textArray.map((text, index) => (
          <motion.h1
            key={index}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 5 }} 
            className="text-[20vw] leading-none pr-20 text-zinc-200 font-bold shadow-red-500"
            style={{ textShadow: '4px 4px 0 red' }} // Adding red shadow
          >
            {text}
          </motion.h1>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
