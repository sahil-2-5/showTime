import React, { useEffect, useState } from "react";
import LoadingPageAnim from "./LoadingPageAnim"; // Adjust the path as necessary
import Home from "./Home";
import Marquee from "./Marquee";
import LocomotiveScroll from "locomotive-scroll";
import Movie from "./Movie";
import Features from "./Features";
import Footer from "./Footer";

const CompHub = () => {
  const [showLoading, setShowLoading] = useState(true); // State to control loading animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to track mouse position

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up the event listener
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Check if the loading animation has been shown before
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (!hasLoadedBefore) {
      const loadingTimer = setTimeout(() => {
        setShowLoading(false); // Hide loading animation after it completes
        sessionStorage.setItem("hasLoadedBefore", "true"); // Set flag in session storage
      }, 4200); // Match this duration with the total duration of your loading animation

      return () => {
        clearTimeout(loadingTimer);
      };
    } else {
      setShowLoading(false); // If already loaded before, skip loading
    }
  }, []);

  // Initialize LocomotiveScroll only on first render
  useEffect(() => {
    const scroll = new LocomotiveScroll();

    // Cleanup locomotive scroll instance on component unmount
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-zinc-600">
      {showLoading ? <LoadingPageAnim /> : <Home />}
      {!showLoading && <Marquee />}{" "}
      {/* Render Marquee only after loading is complete */}
      {!showLoading && <Movie />}{" "}
      {/* Render Movie only after loading is complete */}
      {!showLoading && <Features />}{" "}
      {/* Render Features only after loading is complete */}
      {!showLoading && <Footer />}{" "}
      {/* Render Footer only after loading is complete */}
      
      {/* Cursor Follow Animation */}
      <div
        className="fixed w-8 h-8 top-0 z-50 bg-zinc-200 rounded-full shadow-lg pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 15}px, ${
            mousePosition.y - 15
          }px)`, // Adjusted to center the cursor
          boxShadow: "2px 2px 0px red", // Adding red shadow effect
        }}
      ></div>
    </div>
  );
};

export default CompHub;
