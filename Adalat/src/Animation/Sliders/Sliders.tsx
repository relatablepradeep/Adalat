import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ height = "h-screen", className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
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
    setTimeout(() => setIsAnimating(false), 800);
    resetAutoRotation();
  };

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAnimating(false), 800);
    resetAutoRotation();
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe distance is significant, change slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  };

  return (
    <div className={`w-full overflow-hidden ${height} ${className}`}>
      {/* Main slider container */}
      <div className="relative w-full h-full">
        {/* Slides container */}
        <div
          className="flex h-full transition-transform duration-800 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              
              {/* Content container with animation */}
              <div 
                className={`relative z-10 text-white p-4 md:p-6 lg:p-8 rounded-xl text-center space-y-3 md:space-y-4 lg:space-y-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl transition-all duration-800 ${
                  currentIndex === index 
                    ? "translate-y-0 scale-100 opacity-100" 
                    : index > currentIndex 
                      ? "translate-y-12 scale-95 opacity-0" 
                      : "-translate-y-12 scale-95 opacity-0"
                }`}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">{slide.title}</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">{slide.text}</p>
                <button className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 md:py-3 bg-amber-500 hover:bg-amber-600 transition-all duration-300 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 hover:shadow-lg">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons - hidden on small screens */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-4 lg:left-6 -translate-y-1/2 bg-black/30 text-white p-2 md:p-3 rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:outline-none z-20 hidden sm:block"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 lg:right-6 -translate-y-1/2 bg-black/30 text-white p-2 md:p-3 rounded-full hover:bg-black/60 transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:outline-none z-20 hidden sm:block"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetAutoRotation();
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-white scale-125 shadow-md" 
                  : "bg-white/50 hover:bg-white/80"
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