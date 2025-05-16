import React, { useEffect, useState } from "react";
import axios from "axios";

const Courts = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courtType, setCourtType] = useState("");
  const [pincode, setPincode] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [showLocationAnimation, setShowLocationAnimation] = useState(true);

  // Get user's location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setShowLocationAnimation(false);
        console.log("Geolocation success:", { lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Please allow location access or enter a pincode.");
        setShowLocationAnimation(false);
      }
    );
  }, []);

  // Convert pincode to lat/lon using OpenStreetMap Nominatim
  const fetchCoordsFromPincode = async (pin) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pin}&countrycodes=in`
      );
      console.log("Nominatim response:", res.data);
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        return { lat, lon };
      } else {
        alert("Invalid pincode or location not found. Please try another pincode.");
      }
    } catch (err) {
      console.error("Pincode location error:", err);
      alert("Failed to fetch coordinates for pincode.");
    }
    return null;
  };

  // Calculate distance between two points (in km)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = async () => {
    setLoading(true);
    setIsSearched(true);
    let currentLoc = location;

    if (pincode) {
      const pinLoc = await fetchCoordsFromPincode(pincode);
      if (pinLoc) currentLoc = pinLoc;
    }

    if (!currentLoc.lat || !currentLoc.lon) {
      alert("Location not available. Please try a different pincode or enable geolocation.");
      setLoading(false);
      return;
    }

    console.log("Search coordinates:", currentLoc);

    const query = `
      [out:json][timeout:200];
      (
        node["name"~"[Dd]istrict.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Ff]amily.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Cc]onsumer.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Ll]abour.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Cc]ivil.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Hh]igh.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Ss]upreme.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        node["name"~"[Ss]ession.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Dd]istrict.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Ff]amily.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Cc]onsumer.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Ll]abour.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Cc]ivil.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Hh]igh.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Ss]upreme.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        way["name"~"[Ss]ession.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Dd]istrict.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Ff]amily.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Cc]onsumer.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Ll]abour.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Cc]ivil.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Hh]igh.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Ss]upreme.*[Cc]ourt"](6.0,68.0,37.0,97.0);
        relation["name"~"[Ss]ession.*[Cc]ourt"](6.0,68.0,37.0,97.0);
      );
      out center tags;
    `;

    try {
      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      );

      console.log("Overpass API response:", res.data);
      const data = res.data.elements;

      const courtData = data
        .filter((el) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          if (!lat || !lon) return false;
          const distance = getDistance(currentLoc.lat, currentLoc.lon, lat, lon);
          if (distance > 50) return false; // Filter to 50 km radius

          if (!courtType) return true;

          const tags = el.tags || {};
          const type = tags["courthouse:type"]?.toLowerCase() || "";
          const name = tags.name?.toLowerCase() || "";
          const description = tags.description?.toLowerCase() || "";

          return (
            type.includes(courtType.toLowerCase()) ||
            name.includes(courtType.toLowerCase()) ||
            description.includes(courtType.toLowerCase())
          );
        })
        .map((el) => ({
          id: el.id,
          name: el.tags.name || "Unnamed Court",
          address:
            el.tags["addr:full"] ||
            el.tags["addr:street"] ||
            el.tags["addr:city"] ||
            "No address available",
          phone: el.tags.phone || el.tags["contact:phone"] || "No phone available",
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
          distance: getDistance(currentLoc.lat, currentLoc.lon, el.lat || el.center?.lat, el.lon || el.center?.lon),
        }))
        .sort((a, b) => a.distance - b.distance); // Sort by distance

      console.log("Filtered courts:", courtData);

      setTimeout(() => {
        setCourts(courtData);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Overpass error:", err);
      alert("Failed to fetch courts. Please try again later or use a different location.");
      setLoading(false);
    }
  };

  const courtTypes = [
    "District Court",
    "High Court",
    "Supreme Court",
    "Family Court",
    "Civil Court",
    "Consumer Court",
    "Labour Court",
    "Tax Tribunal",
    "Juvenile Court",
    "Magistrate Court",
    "Sessions Court",
    "Arbitration Center",
    "Legal Aid",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-blue-400 to-teal-300"></div>
        <div className="absolute -left-24 -top-24 w-48 h-48 rounded-full bg-blue-100 opacity-50"></div>
        <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-indigo-100 opacity-50"></div>

        <div className="md:flex">
          {/* Left sidebar with illustrations and quotes */}
          <div className="hidden lg:block lg:w-1/3 bg-gradient-to-b from-indigo-500 to-blue-600 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 animate-float">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1h2a2 2 0 012 2v3h-2v1a1 1 0 01-1 1H8a1 1 0 01-1-1V9H5V6a2 2 0 012-2h2V3a1 1 0 011-1zM7 12v4a2 2 0 002 2h2a2 2 0 002-2v-4H7z" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-6 font-serif tracking-wide">Access Justice Nearby</h2>

              <div className="mb-12 space-y-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20 transform transition-all duration-300 hover:translate-y-1 hover:bg-opacity-20">
                  <p className="italic text-white text-opacity-90 font-serif">
                    "Justice delayed is justice denied."
                  </p>
                  <p className="text-right mt-2 text-white text-opacity-70">— William E. Gladstone</p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20 transform transition-all duration-300 hover:translate-y-1 hover:bg-opacity-20">
                  <p className="italic text-white text-opacity-90 font-serif">
                    "The law is reason, free from passion."
                  </p>
                  <p className="text-right mt-2 text-white text-opacity-70">— Aristotle</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-xl mb-2">Principles of Justice</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Fairness</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Equality</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Accessibility</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Transparency</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-40 h-40 border-4 border-white border-opacity-30 rounded-full"></div>
            <div className="absolute top-20 -right-10 w-20 h-20 border-4 border-white border-opacity-20 rounded-full"></div>
          </div>

          {/* Main content */}
          <div className="lg:w-2/3 p-6 md:p-12">
            <div className="flex items-center mb-8 animate-fade-in">
              <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 font-serif tracking-wide">
                Court Finder India
              </h1>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-100 mb-8 transform transition-all duration-500 animate-fade-in-up">
              <p className="text-indigo-700 italic mb-6 font-serif text-lg border-l-4 border-indigo-300 pl-4">
                "The foundation of justice is good faith."
                — Cicero
              </p>

              {/* Court Type Dropdown */}
              <div className="mb-6">
                <label className="block text-indigo-700 mb-2 font-medium">Select Court Type</label>
                <div className="relative group">
                  <select
                    className="appearance-none w-full bg-white border-2 border-indigo-200 p-4 rounded-lg pl-5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-gray-700"
                    value={courtType}
                    onChange={(e) => setCourtType(e.target.value)}
                  >
                    <option value="">All Court Types</option>
                    {courtTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-indigo-500 group-hover:text-indigo-700 transition-colors duration-200">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>

              {/* Pincode input */}
              <div className="mb-8">
                <label className="block text-indigo-700 mb-2 font-medium">Enter Location Pincode</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter Pincode (optional)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-white border-2 border-indigo-200 p-4 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md text-gray-600"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>

              {/* Location Status Indicator */}
              <div className="flex items-center mb-6 bg-white bg-opacity-70 p-3 rounded-lg">
                <div
                  className={`h-3 w-3 rounded-full mr-3 ${
                    location.lat ? "bg-indigo-500" : "bg-amber-500"
                  } ${showLocationAnimation ? "animate-pulse" : ""}`}
                ></div>
                <span className="text-sm text-gray-600">
                  {showLocationAnimation
                    ? "Detecting your location..."
                    : location.lat
                    ? "Location successfully detected"
                    : "Location unavailable"}
                </span>
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-102 flex justify-center items-center
                ${loading ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg hover:translate-y-1"}`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="animate-pulse">Searching for courts...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find Courts
                  </>
                )}
              </button>
            </div>

            <div className="transition-all duration-500">
              {isSearched && !loading && courts.length === 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-amber-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700">
                        No courts found within 50 km. Try a different pincode (e.g., 560001 for Bangalore), selecting a
                        different court type, or checking your location settings. Note: Court data may be limited in some
                        regions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
                {courts.map((court, index) => (
                  <div
                    key={court.id}
                    className={`bg-white border border-indigo-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500
                      transform hover:-translate-y-2 opacity-0 animate-fade-in`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full p-3 mr-4 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-xl text-indigo-800 mb-2 font-serif">{court.name}</h2>
                        <div className="mb-3 flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-gray-600">{court.address}</span>
                        </div>
                        <div className="mb-3 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="text-gray-600">{court.phone}</span>
                        </div>
                        <div className="mb-5 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                          </svg>
                          <span className="text-gray-600">Distance: {court.distance.toFixed(2)} km</span>
                        </div>
                        <div className="flex flex-wrap space-x-2">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${court.lat},${court.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 mb-2 sm:mb-0"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                              />
                            </svg>
                            View on Map
                          </a>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center text-gray-600 text-sm border-t border-indigo-100 pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-300 to-blue-400 rounded-full"></div>
              </div>
              <p className="font-serif italic">Promoting access to justice through local courts</p>
              <div className="flex justify-center mt-4 space-x-8">
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <span>Justice</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Equality</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span>Fairness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
        }

        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Courts;