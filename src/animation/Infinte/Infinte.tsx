const Infinite = () => {
  const [positions, setPositions] = useState([
    { left: '-30%' },
    { left: '0%' },
    { left: '30%' },
    { left: '60%' },
    { left: '90%' }
  ]);

  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const boxWidth = 64;
  const animationRef = useRef(null);

  // Updated box contents with Indian legal statistics
  const boxContents = [
    { title: "25+", detail: "High Courts across India serving justice" },
    { title: "672+", detail: "District Courts providing local legal remedies" },
    { title: "5000+", detail: "Legal aid clinics offering free consultation" },
    { title: "100K+", detail: "Registered advocates to represent your case" },
    { title: "50+", detail: "Legal literacy programs nationwide" }
  ];

  useEffect(() => {
    const moveBoxes = () => {
      if (isAnimationPaused) return;

      setPositions(prevPositions => {
        return prevPositions.map((box, idx) => {
          if (parseFloat(box.left) < -boxWidth) {
            const rightmostPosition = Math.max(...prevPositions.map(p => parseFloat(p.left)));
            return { ...box, left: `${rightmostPosition + 30}%` };
          }
          return { ...box, left: `${parseFloat(box.left) - 0.75}%` };
        });
      });
    };

    animationRef.current = setInterval(moveBoxes, 100);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isAnimationPaused]);

  const handleMouseEnter = () => {
    setIsAnimationPaused(true);
  };

  const handleMouseLeave = () => {
    setIsAnimationPaused(false);
  };

  return (
    <div className="relative w-full h-72 bg-gradient-to-t from-indigo-900 to-blue-800 overflow-hidden flex items-center">
      {positions.map((box, index) => (
        <div
          key={index}
          className="absolute h-36 w-48 sm:h-48 sm:w-56 md:h-64 md:w-64 rounded-xl bg-white flex flex-col items-center justify-center p-4 
          shadow-xl text-gray-800 transform transition-all duration-300 hover:shadow-amber-500/50 hover:scale-105 border-l-4 border-amber-500"
          style={{
            left: box.left,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.1s linear, transform 0.3s ease, box-shadow 0.3s ease',
            marginRight: '12px'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 tracking-wide font-serif">
            {boxContents[index].title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-center text-gray-700 font-sans">
            {boxContents[index].detail}
          </p>
        </div>
      ))}
    </div>
  );
};