import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Orbit from "../../animation/Carousel/Orbit";
// import ParallaxScroll from "../../animation/parralax/Parralax";
import Video from '../../animation/Reels/Video';
import Blog from '../../animation/Blog/Blog'

// Updated Infinite component
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

// Updated Scroll component for Indian legal news
const Scroll = () => {
  const newsItems = [
    {
      title: "Supreme Court Upholds Right to Privacy as Fundamental Right",
      image: "/api/placeholder/400/320",
      content: "In a landmark judgment, the Supreme Court of India reaffirms that the right to privacy is a fundamental right under the Indian Constitution."
    },
    {
      title: "High Court Issues New Guidelines on Bail Procedures",
      image: "/api/placeholder/400/320",
      content: "Delhi High Court has issued new guidelines streamlining bail procedures to reduce unnecessary detention and ensure timely justice."
    },
    {
      title: "Legal Aid Services Now Available through Mobile App",
      image: "/api/placeholder/400/320",
      content: "The Ministry of Law and Justice launches mobile application connecting citizens with free legal aid services across all districts."
    },
    {
      title: "New Fast Track Courts for Women's Safety Cases",
      image: "/api/placeholder/400/320",
      content: "Government establishes 400 new fast-track courts dedicated to cases related to women's safety and domestic violence across India."
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleNavigation = (title) => {
    alert(`Navigating to ${title} news page`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-white text-center font-serif">
        Latest Legal News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full max-w-6xl">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg cursor-pointer transition-all overflow-hidden"
            style={{ opacity: hoveredIndex === index ? 1 : 0.9 }}
            onClick={() => handleNavigation(item.title)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(index)}
            onTouchEnd={() => setHoveredIndex(null)}
          >
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-amber-700 font-serif">{item.title}</h2>
              <p className="text-sm text-gray-700 font-sans">{item.content}</p>
            </div>

            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-amber-600 opacity-20"></div>
            )}
          </div>
        ))}
      </div>

      <div className="text-gray-200 text-center text-sm md:text-base max-w-md font-sans">
        <p>Stay informed about legal developments. Click on news items to read full articles.</p>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with Indian legal theme */}
      <section className="w-full min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900 text-center flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif leading-tight">
            आदालत में न्याय पाना अब हुआ आसान
            <span className="block text-2xl md:text-3xl mt-2 text-amber-400">
              (Justice Made Accessible)
            </span>
          </h1>
          <h3 className="text-lg md:text-xl text-gray-200 mb-8 font-sans max-w-3xl mx-auto">
            Adalat connects you with nearby courts and experienced government advocates as well as private lawyers according to your budget. From filing FIRs to understanding your fundamental rights, we ensure you get the justice you deserve.
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/lawyers")}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl shadow-lg hover:bg-amber-700 transition-all font-sans font-medium text-lg"
            >
              Find Nearby Lawyers
            </button>
            <button
              onClick={() => navigate("/legal-aid")}
              className="px-6 py-3 bg-transparent border-2 border-amber-400 text-amber-400 rounded-xl shadow hover:bg-amber-400 hover:text-indigo-900 transition-all font-sans font-medium text-lg"
            >
              Free Legal Aid
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Infinite />

      {/* Sector-specific Law Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-serif">
            कानूनी जागरूकता
            <span className="block text-xl text-amber-600 mt-2 font-sans">
              (Legal Literacy by Sector)
            </span>
          </h1>
          <h3 className="text-lg text-gray-700 mb-10 font-sans max-w-3xl mx-auto">
            Know your rights and legal remedies across different sectors. From family disputes to consumer rights, understand the law and take action against injustice.
          </h3>
          <Orbit />
        </div>
      </section>

      {/* News Section */}
      <Scroll />

      {/* Reels Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-serif">
            कानूनी शिक्षा के वीडियो
            <span className="block text-xl text-amber-600 mt-2 font-sans">
              (Legal Education Videos)
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-10 font-sans max-w-3xl mx-auto">
            Learn about your legal rights and procedures through easy-to-understand video explainers from top legal experts across India.
          </p>
          <Video />
        </div>
      </section>



      {/* Blog section */}

      <section >
        <div>
          <h1>Vichaar</h1>
          <p>rakho apna vichaar ya do kuch raaya in legal procedure so they dont have to face same problem which face by you </p>

        <Blog/>
        </div>
      </section>

    </>
  );
}