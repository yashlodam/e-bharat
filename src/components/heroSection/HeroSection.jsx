import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom"; // if using React Router

const slides = [
  {
    url: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/BAU/Hero/Winterflip/Jewellery_-_women_Copy_5_1500x460._SX1500_QL85_FMpng_.png",
    
  },
  {
    url: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Jupiter/Event/Thankyouevent/v2/mens_clothing_Copy_1_1500x460._SX1500_QL85_FMpng_.png",
   
  },
  {
    url: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Jupiter/Event/Thankyouevent/v2/Footwear_1500x460._SX1500_QL85_FMpng_.png",
   
  },
  {
    url: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Jupiter/Event/Thankyouevent/v2/Unrec_watches_1500x460._SX1500_QL85_FMpng_.png",
    
  },
];

function HeroSection() {
  const { mode } = useContext(myContext);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (link) => {
    navigate(link); // Navigate to the related page
  };

  return (
    <div className="relative w-full mt-4 overflow-hidden rounded-2xl shadow-xl bg-black">

      {/* Responsive height */}
      <div className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px]">

        {/* Slider Container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 flex items-center justify-center bg-black cursor-pointer"
              onClick={() => handleClick(slide.link)}
            >
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark mode overlay */}
      {mode === "dark" && <div className="absolute inset-0 bg-black/40"></div>}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 pointer-events-none">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
          Welcome to E-Bharat
        </h1>
        <p className="text-white mt-2 text-xs sm:text-sm md:text-lg drop-shadow-md">
          Smart Deals • Big Discounts • Shop Anytime
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full cursor-pointer transition-all duration-300 
              ${current === index ? "bg-pink-600 w-6" : "bg-white/60"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
