import React, { useEffect, useState } from "react";

/* importing images for slideshow */
const images = [
  "https://i.pinimg.com/564x/8a/97/31/8a9731f4620ea3e2b02341e506d3b07e.jpg",
  "https://i.pinimg.com/564x/db/12/e1/db12e155c8993ce50a07f8d43dfce31a.jpg",
  "https://i.pinimg.com/736x/e6/d5/91/e6d591da3d2d458a22f4267396877622.jpg",
  "https://i.pinimg.com/564x/ee/8d/7a/ee8d7aed33177da3b26ffbc1d66366d3.jpg",
  "https://i.pinimg.com/736x/17/5d/81/175d814aef89755564cb351eac435acf.jpg",
];

function Slider({ autoSlide = false, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? images.length - 3 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === images.length - 3 ? 0 : curr + 1));

  /* This part is for auto sliding */
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="absolute h-[450px] w-auto mt-[150px] ml-[1000px]">
      <div className="slider rounded-xl overflow-hidden shadow-red-lg relative w-[329px] h-[500px]">
        <div
          className="h-full w-full flex transition-transform ease-out duration-500 justify-center"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${
                  curr === i ? "p-0.5" : "bg-opacity-50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
