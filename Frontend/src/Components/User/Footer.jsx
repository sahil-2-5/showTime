import React from "react";
import { motion } from "framer-motion";
import facebook from "/Images/facebook.png";
import insta from "/Images/insta.png";
import pint from "/Images/pinterest.png";
import x from "/Images/twitter.png";

const Footer = () => {
  return (
    <>
      <div className="bg-zinc-800 font-londrina tracking-wider p-10 overflow-hidden font-lilita">
        <div className="border-b border-zinc-500 w-full flex">
          <div className="p-5">
            <div className="flex">
              <table className="text-md text-white">
                <div className="textstructure font-londrina text-white">
                  <div className="flex justify-center">
                    <h1
                      className="left-20 text-[2.0vw] leading-[6.5vw] tracking-widest font-bold text-zinc-200 -mt-14 shadow-red-500"
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

                <tr>
                  <td>
                    <p className="hover:scale-50 cursor-pointer">Home</p>
                  </td>
                  <td>
                    <p className="cursor-pointer">About us</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="cursor-pointer">SignIn</p>
                  </td>
                  <td>
                    <p className="cursor-pointer">SignUp</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="cursor-pointer">Help</p>
                  </td>
                </tr>
              </table>
            </div>
            <div className="mt-10">
              <table>
                <tr className="gap-5 flex">
                  <td>
                    <img className="h-10" src={facebook} alt="Facebook" />
                  </td>
                  <td>
                    <img className="h-10" src={insta} alt="Instagram" />
                  </td>
                  <td>
                    <img className="h-10" src={pint} alt="Pinterest" />
                  </td>
                  <td>
                    <img className="h-10" src={x} alt="Twitter" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="ml-auto">
            <h3 className="p-4 text-gray-400">
              Get the freshest showTime news
            </h3>
            <input
              className="p-2 w-96 bg-zinc-800 mr-5 text-gray-500 border border-gray-400 rounded"
              type="text"
              placeholder="Your email here"
            />
            <button className="text-zinc-200 bg-red-500 w-32 rounded-lg text-xl p-2">
              Subscribe
            </button>
            <br />
            <div className="flex mt-5">
              <input
                className="border-none"
                type="checkbox"
              />
              <div className="p-2">
                <p className="text-sm text-gray-400">
                  {" "}
                  By checking the box, you agree that you are at least 18 years of age.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <div className="mt-1 gap-5 ml-5 flex text-gray-400 text-sm">
            <p> Website Term</p>
            <p>|</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <p className="mt-2 text-gray-400 text-sm ml-5">
              {" "}
              &copy; show Time 2015 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
