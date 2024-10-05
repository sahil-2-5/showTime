import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false); // State to control whether the search bar is focused

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    // Handle the search action here (e.g., fetch movies, filter list, etc.)
  };

  const handleFocus = () => {
    setIsFocused(true); // Expand search bar on focus
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setIsFocused(false); // Collapse search bar on blur only if there is no search term
    }
  };

  return (
    <nav className="fixed ml-10 font-normal rounded-3xl text-white top-5 left-0 right-10 flex justify-between items-center h-20 px-[700px]">
      <div className="textstructure font-londrina text-white">
        <div className="flex justify-center">
          <h1
            className="fixed left-20 text-[3.0vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 -mt-14 shadow-red-500"
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
              ShowTime
            </motion.div>
          </h1>
        </div>
      </div>

      <div className="textstructure font-londrina text-white">
        <div className="flex justify-center space-x-10">
          {/* About Us Link */}
          <Link
            to="/about"
            className="text-[2.0vw]  leading-[6.5vw] tracking-widest ml-[500px] font-bold text-zinc-200 shadow-red-500"
            style={{ textShadow: "4px 4px 0 red" }}
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
              About
            </motion.div>
          </Link>

          {/* Login Link */}
          <Link
            to="/login"
            className="text-[2.0vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
            style={{ textShadow: "4px 4px 0 red" }}
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
              Login
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
