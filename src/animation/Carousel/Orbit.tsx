import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Carousel.css";

const items = ["One", "Two", "Three", "Four", "Five", "Six"];

const Orbit= () => {
  const carouselRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const startXRef = useRef(0);
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Auto-rotation logic with hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current && !isHovered) { // Pause when hovering
        const newAngle = angle + 1;
        setAngle(newAngle);
        rotateCarousel(newAngle);
      }
    }, 40); // adjust for speed

    return () => clearInterval(interval);
  }, [angle, isHovered]); // Re-run the effect when angle or hover status changes

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



    <>


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
              onMouseEnter={() => setIsHovered(true)}  // Pause on hover
              onMouseLeave={() => setIsHovered(false)} // Resume after hover
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>



    </>
  );
};

export default Orbit;
