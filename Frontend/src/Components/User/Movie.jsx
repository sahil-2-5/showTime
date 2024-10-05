import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import { Link } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/movie")
      .then((m) => setMovie(m.data))
      .catch((e) => console.log(e));
  }, []);

  // Animation variants for slide-in effect from the left
  const leftVariants = {
    offscreen: {
      x: -150, // Start off the screen to the left
      opacity: 0,
    },
    onscreen: {
      x: 0, // Moves to its original position
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  // Animation variants for slide-in effect from the right
  const rightVariants = {
    offscreen: {
      x: 150, // Start off the screen to the right
      opacity: 0,
    },
    onscreen: {
      x: 0, // Moves to its original position
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed="0.1"
        className="w-full h-auto py-10 z-[10] font-londrina overflow-hidden -mt-24 font-lilita rounded-tr-3xl rounded-tl-3xl bg-zinc-800 flex justify-center flex-wrap gap-10"
      >
        <div className="textstructure font-londrina text-white w-full px-[160px] shadow-red-500">
          <div className="flex justify-between mt-20">
            <h1
              className="text-[7.5vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
              style={{ textShadow: "4px 4px 0 red" }}
            >
              <motion.div
                initial={{ y: 10, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                All Movies
              </motion.div>
            </h1>
            <Link
              to="/category"
              className="text-[1.5vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 shadow-red-500"
              style={{ textShadow: "4px 4px 0 red" }}
            >
              <motion.div
                initial={{ y: 10, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                Category..
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mapping over the array to render the same movie card multiple times */}
        {movie.map((movie) => {
          return (
            <div key={movie._id}>
              <Link to={`/moviepage/${movie._id}`}>
                <div className="h-68 w-52 rounded-md overflow-hidden">
                  <img src={movie.moviePoster} />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Movie;
