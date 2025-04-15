import { useState, useEffect, useRef } from 'react';
import justicelady from '../../assets/justice.png';
import farmer from '../../assets/farmer.png';
import gangster from '../../assets/Gangster.png';

export default function ParallaxScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const sectionHeight = section.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else if (rect.bottom < window.innerHeight) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Show initial scene even before scrolling
  const initialVisible = true; // Always show the characters
  const gangsterTextVisible = scrollProgress > 0.3;
  const farmerTextVisible = scrollProgress > 0.5;
  const showLady = scrollProgress > 0.7 || scrollProgress < 0.1; // Show lady at start and end
  const ladyTextVisible = scrollProgress > 0.9;

  return (
    <div ref={sectionRef} className="w-full h-[300vh] relative bg-amber-100">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-screen flex items-stretch overflow-hidden">
          {/* Farmer (Left) */}
          <div className="flex-1 h-full relative">
            <div
              className={`absolute top-10 left-1/2 -translate-x-1/2 bg-amber-100 p-3 rounded-xl shadow-md transition-all duration-500 z-10 ${
                farmerTextVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
              <p className="text-base md:text-xl font-bold text-center">Koi toh bachao</p>
            </div>
            <div
              className={`w-full h-full transition-all duration-700 ease-out ${
                initialVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${farmer})` }}
              ></div>
            </div>
          </div>

          {/* Center (Lady Justice) */}
          <div className="flex-1 h-full relative">
            <div
              className={`absolute top-10 left-1/2 -translate-x-1/2 bg-amber-100 p-3 rounded-xl shadow-md transition-all duration-500 z-10 ${
                ladyTextVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
              <p className="text-base md:text-xl font-bold text-center">Mai hu na</p>
            </div>
            <div className="w-full h-full">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                  backgroundImage: `url(${justicelady})`,
                  opacity: showLady ? 1 : 0,
                  transform: `scale(${showLady ? 1 : 0.8})`,
                }}
              ></div>
            </div>
          </div>

          {/* Gangster (Right) */}
          <div className="flex-1 h-full relative">
            <div
              className={`absolute top-10 left-1/2 -translate-x-1/2 bg-amber-100 p-3 rounded-xl shadow-md transition-all duration-500 z-10 ${
                gangsterTextVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
              <p className="text-base md:text-xl font-bold text-center">Paisa de de yaha</p>
            </div>
            <div
              className={`w-full h-full transition-all duration-700 ease-out ${
                initialVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${gangster})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Attractive title and instructions */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-amber-200 to-transparent py-4 text-center z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800">Justice in Action</h1>
      </div>

      {/* Better scroll instruction */}
      {scrollProgress < 0.1 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-amber-700 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            <p className="font-medium">Scroll down to see the story unfold</p>
          </div>
        </div>
      )}
    </div>
  );
}