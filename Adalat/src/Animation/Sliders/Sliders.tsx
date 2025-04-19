import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      image: '/api/placeholder/1600/900',
      title: 'Nature is Beautiful',
      text: 'Explore the wonders of the world.',
      buttonText: 'Explore Now',
    },
    {
      image: '/api/placeholder/1600/900',
      title: 'Feel the Chill',
      text: 'Discover breathtaking mountains.',
      buttonText: 'See More',
    },
    {
      image: '/api/placeholder/1600/900',
      title: 'Go Green',
      text: 'Rejuvenate in the heart of nature.',
      buttonText: 'Get Started',
    },
  ];

  const resetAutoRotation = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 10000);
  };

  useEffect(() => {
    resetAutoRotation();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAnimating(false), 1000);
    resetAutoRotation();
  };

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAnimating(false), 1000);
    resetAutoRotation();
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Main slider container */}
      <div className="relative w-full h-full">
        {/* Slides container */}
        <div
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {/* Content container with animation */}
              <div 
                className={`relative z-10 text-white p-8 rounded-xl text-center space-y-6 max-w-2xl transform transition-all duration-1000 ${
                  currentIndex === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
                }`}
              >
                <h2 className="text-5xl font-bold tracking-wide">{slide.title}</h2>
                <p className="text-xl">{slide.text}</p>
                <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 transition-all duration-300 rounded-full text-lg font-semibold transform hover:scale-105">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110 focus:outline-none z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110 focus:outline-none z-20"
          aria-label="Next Slide"
        >
          <ChevronRight size={32} />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetAutoRotation();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;