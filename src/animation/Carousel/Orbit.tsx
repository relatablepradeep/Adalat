import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Carousel.css";

const items = ["Labour Law", "Criminal Law", "Family Law", "Corporate Law", "Agriculture Law", "Constitutional Law"];

const Orbit = () => {
  const carouselRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const startXRef = useRef(0);
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotation logic with hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current && !isHovered) {
        const newAngle = angle + 1;
        setAngle(newAngle);
        rotateCarousel(newAngle);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [angle, isHovered]);

  const rotateCarousel = (newAngle) => {
    gsap.to(carouselRef.current, {
      rotationY: newAngle,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startXRef.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const delta = e.clientX - startXRef.current;
    const updatedAngle = angle + delta * 0.3;
    setAngle(updatedAngle);
    rotateCarousel(updatedAngle);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="scene">
      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
      >
        {items.map((text, index) => {
          const rotation = index * (360 / items.length);
          return (
            <div
              key={index}
              className="carousel-item"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(400px)`,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orbit;