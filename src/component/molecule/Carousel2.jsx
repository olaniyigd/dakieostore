"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  {
    src: "/assets/female4.png",
    text: "Shop Now"
  },
  {
    src: "/assets/female6.png",
    text: "Shop Now"
  },
  {
    src: "/assets/female7.png",
    text: "Shop Now"
  }
];

export default function Carousel2() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full md:w-[40%] h-[80vh] rounded-[5px] border border-gray-300 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={image.src}
            alt={`Slide ${index}`}
            layout="fill"
            objectFit="cover"
            className="rounded-[5px]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-transparent border text-white py-2 px-4 rounded">
              {image.text}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
