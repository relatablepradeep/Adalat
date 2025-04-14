import Infinte from "../../animation/Infinte/Infinte";
import Orbit from "../../animation/Carousel/Orbit";
import { useNavigate } from "react-router";
import ParallaxScroll from "../../animation/parralax/Parralax";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="w-full    bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Confused about where to seek justice? We’re here to help you claim what’s rightfully yours.
          </h1>
          <h3 className="text-lg text-gray-600 mb-6">
            Adalat connects you with nearby courts and experienced goverment lawyers as well as private lawyers according to your budget, ensuring swift action to address your injustice.
          </h3>
          <button
            onClick={() => navigate("/lawyers")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
          >
            Nearby Lawyers
          </button>
        </div>
      </section>

      {/* Animations */}
      {/* <Orbit /> */}
      <Infinte />


      <ParallaxScroll/>
    </>
  );
}
