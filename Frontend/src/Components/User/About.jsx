import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className='w-full h-screen relative'>
      {/* Background Image with Blur */}
      <div
        className='absolute top-0 left-0 w-full h-full bg-[url("https://i.pinimg.com/564x/4f/85/11/4f851189c5d3b16833365eab290c3d58.jpg")] bg-no-repeat bg-cover'
        style={{ filter: "blur(10px)", zIndex: 1 }}
      ></div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-2"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-10 text-white">
        {/* Title */}
        <motion.h1
          className="text-6xl font-extrabold mb-8"
          style={{ textShadow: "4px 4px 0 red" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>

        {/* Info Section */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8 w-full lg:w-1/2">
            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Simple Log-In</h2>
              <p className="font-bold" >Whether you’re a movie enthusiast or cinema manager, logging in is quick and straightforward, granting you access to all features instantly.</p>
            </motion.div>

            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Fast and Easy Booking</h2>
              <p className="font-bold" >Browse the latest movies, select showtimes, and book your tickets with ease through our user-friendly interface.</p>
            </motion.div>

            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Instant Seat Availability</h2>
              <p className="font-bold" >View real-time updates to select the perfect seat for your movie experience. No more guessing—see what's available instantly.</p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 w-full lg:w-1/2">
            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Secure Payments</h2>
              <p className="font-bold" >Our secure payment system ensures that your financial details are protected, making for a safe and smooth transaction every time.</p>
            </motion.div>

            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Personal Dashboard</h2>
              <p className="font-bold" >Track bookings, view ticket history, and explore personalized recommendations, all from your customized dashboard.</p>
            </motion.div>

            <motion.div
              className="bg-transparent bg-opacity-50 p-6 rounded-lg flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ textShadow: "2px 2px 0 red" }}>Admin Controls</h2>
              <p  >Cinema managers can effortlessly manage showtimes, seating, and listings with our intuitive admin panel.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
