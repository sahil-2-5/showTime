import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingPageAnim = () => {
  const [showRectangle, setShowRectangle] = useState(false);
  const [percentage, setPercentage] = useState(0); // State for percentage loader
  const [isFullScreen, setIsFullScreen] = useState(false); // State to control full screen
  const [loaderVisible, setLoaderVisible] = useState(true); // State for loader visibility

  useEffect(() => {
    // Start showing the rectangle after 1 second
    const timer = setTimeout(() => {
      setShowRectangle(true);
    }, 1000);

    // Set the rectangle to full screen after 2 seconds
    const fullScreenTimer = setTimeout(() => {
      setIsFullScreen(true);
    }, 2000);

    // Percentage loader from 0% to 100%
    let interval;
    if (showRectangle) {
      interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(interval); // Stop the interval when reaching 100%
            setLoaderVisible(false); // Hide the percentage loader after it reaches 100%
            return 100;
          }
        });
      }, 20); // Adjust the speed of percentage increase
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(fullScreenTimer);
      clearInterval(interval); // Clear interval when component unmounts
    };
  }, [showRectangle]);

  return (
    <div className="relative font-londrina h-screen w-screen bg-zinc-600 text-zinc-200 flex items-center justify-center overflow-hidden">
      {showRectangle && (
        <motion.div
          className="bg-zinc-900 rounded-3xl flex items-center justify-center relative"
          initial={{ y: "100vh" }} // Pop-up animation from bottom
          animate={{ y: 0 }} // Move to the center
          transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
          style={{
            width: isFullScreen ? "100vw" : "80vw", // Full screen or 85% of the viewport width
            height: isFullScreen ? "100vh" : "80vh", // Full screen or 85% of the viewport height
            padding: "10%", // Padding set to 10%
            boxSizing: "border-box", // Ensures padding is included in the total size
            transition: "width 1s ease-in-out, height 1s ease-in-out", // Smooth transition for width and height
          }}
        >
          {/* Percentage Loader inside the rectangle with fade-out animation */}
          {loaderVisible && (
            <motion.div
              className="absolute top-8 right-8 text-9xl font-bold "
              initial={{ opacity: 1 }} // Start fully visible and normal size
              animate={percentage === 100 ? { opacity: 0 } : { opacity: 1 }} // Shrink and fade out when 100%
              transition={{ duration: 1.0, ease: "easeInOut" }} // Slow down the fade-out and shrinking
            >
              {percentage}%
            </motion.div>
          )}

          <div className="textstructure tracking-wide font-bold -ml-[700px] mt-5 ">
            {["Book Your", "Ticket", "Now"].map((item, index) => {
              return (
                <div className="masker" key={index}>
                  <div className="w-fit flex">
                    <motion.h1
                      className="text-[7.5vw] tracking-widest leading-[6.5vw]"
                      initial={{ opacity: 0, y: 20 }} // Start with hidden opacity and offset
                      animate={{ opacity: percentage / 100, y: 0 }} // Fade in as percentage increases
                      transition={{ duration: 1 }} // Slight delay for effect
                    >
                      {item}
                    </motion.h1>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      
    </div>
  );
};

export default LoadingPageAnim;
