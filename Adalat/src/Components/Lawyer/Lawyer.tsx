import React, { useState, useEffect } from "react";
import { Scale, Heart, Home, Briefcase, Shield, ChevronRight, MapPin, IndianRupee, ExternalLink, Phone } from "lucide-react";

const Lawyer = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  
  const lawyerTypes = [
    {
      id: 1,
      icon: Scale,
      title: "Criminal Defense Lawyer",
      description: "Defend individuals accused of crimes",
      where: "National Legal Services Authority (NALSA)",
      fees: "₹5,000 – ₹1,00,000+",
      complexity: "depending on case complexity",
      phone: "+91-9876543210",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgGradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
      borderColor: "border-pink-400/50",
      iconColor: "text-pink-400",
      textColor: "text-pink-600",
      glowColor: "shadow-pink-500/30",
      delay: 0
    },
    {
      id: 2,
      icon: Heart,
      title: "Family Lawyer",
      description: "Handle divorce, child custody, domestic violence, and other family-related matters",
      where: "District Legal Services Authority (DLSA)",
      fees: "₹3,000 – ₹50,000",
      complexity: "",
      phone: "+91-9876543211",
      gradient: "from-cyan-500 via-teal-500 to-emerald-500",
      bgGradient: "from-cyan-500/20 via-teal-500/20 to-emerald-500/20",
      borderColor: "border-cyan-400/50",
      iconColor: "text-cyan-400",
      textColor: "text-cyan-600",
      glowColor: "shadow-cyan-500/30",
      delay: 200
    },
    {
      id: 3,
      icon: Home,
      title: "Property / Real Estate Lawyer",
      description: "Deal with land disputes, property registration, and real estate contracts",
      where: "State Bar Council Website",
      fees: "₹10,000 – ₹1,00,000+",
      complexity: "",
      phone: "+91-9876543212",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      bgGradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      borderColor: "border-blue-400/50",
      iconColor: "text-blue-400",
      textColor: "text-blue-600",
      glowColor: "shadow-blue-500/30",
      delay: 400
    },
    {
      id: 4,
      icon: Briefcase,
      title: "Labour & Employment Lawyer",
      description: "Help with wrongful termination, harassment at work, and labor disputes",
      where: "Ministry of Labour and Employment",
      fees: "₹5,000 – ₹50,000",
      complexity: "",
      phone: "+91-9876543213",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      bgGradient: "from-purple-500/20 via-violet-500/20 to-fuchsia-500/20",
      borderColor: "border-purple-400/50",
      iconColor: "text-purple-400",
      textColor: "text-purple-600",
      glowColor: "shadow-purple-500/30",
      delay: 600
    },
    {
      id: 5,
      icon: Shield,
      title: "Consumer Protection Lawyer",
      description: "Assist with fraud, defective goods/services, and filing cases in consumer courts",
      where: "National Consumer Helpline",
      fees: "₹2,000 – ₹20,000",
      complexity: "",
      phone: "+91-9876543214",
      gradient: "from-orange-500 via-pink-500 to-purple-500",
      bgGradient: "from-orange-500/20 via-pink-500/20 to-purple-500/20",
      borderColor: "border-orange-400/50",
      iconColor: "text-orange-400",
      textColor: "text-orange-600",
      glowColor: "shadow-orange-500/30",
      delay: 800
    }
  ];

  useEffect(() => {
    lawyerTypes.forEach((lawyer, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, lawyer.id]);
      }, lawyer.delay);
    });
  }, []);

  return (
    <>
      {/* Vibrant Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-orange-500/40 to-pink-500/40 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-6 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                ⚖️ Find Your Legal Hero
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
            </div>
            
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Every legal battle needs the{' '}
                <span className="font-bold text-2xl bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  perfect champion
                </span>
                {' '}by your side.
              </p>
              
              <p className="text-gray-200 text-base md:text-lg mt-3 font-medium">
                Discover specialized lawyers ready to fight for your justice ⚡
              </p>
              
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-bounce"
                      style={{animationDelay: `${i * 0.2}s`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lawyer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lawyerTypes.map((lawyer) => {
              const IconComponent = lawyer.icon;
              const isVisible = visibleCards.includes(lawyer.id);
              
              return (
                <div 
                  key={lawyer.id}
                  className={`group relative backdrop-blur-xl bg-gradient-to-br ${lawyer.bgGradient} rounded-2xl p-6 border ${lawyer.borderColor} shadow-2xl ${lawyer.glowColor} transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:bg-white/20 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{transitionDelay: `${lawyer.delay}ms`}}
                >
                  {/* Neon Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${lawyer.gradient} opacity-0 group-hover:opacity-30 rounded-2xl blur-xl transition-opacity duration-500`}></div>
                  
                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl backdrop-blur-sm bg-white/20 border ${lawyer.borderColor} mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`${lawyer.iconColor} group-hover:drop-shadow-lg`} size={28} />
                      </div>
                      <h3 className={`text-xl font-bold bg-gradient-to-r ${lawyer.gradient} bg-clip-text text-transparent`}>
                        {lawyer.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 mb-4 border border-white/20">
                      <p className="text-gray-100 text-sm leading-relaxed">
                        <span className="font-semibold text-white">Expertise:</span> {lawyer.description}
                      </p>
                    </div>

                    {/* Where to Find */}
                    <div className="flex items-start mb-4 backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20">
                      <MapPin className="text-cyan-400 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="text-gray-200 text-sm">
                          <span className="font-semibold text-white">Find them at:</span>
                        </p>
                        <p className="text-cyan-300 font-semibold text-sm">{lawyer.where}</p>
                      </div>
                    </div>

                    {/* Fees */}
                    <div className="flex items-start mb-4 backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20">
                      <IndianRupee className="text-green-400 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="text-gray-200 text-sm">
                          <span className="font-semibold text-white">Investment:</span>
                        </p>
                        <p className="text-green-300 font-bold text-sm">
                          {lawyer.fees}
                          {lawyer.complexity && (
                            <span className="text-gray-400 text-xs font-normal ml-2">
                              {lawyer.complexity}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Click-to-Call Phone */}
                    <a 
                      href={`tel:${lawyer.phone}`}
                      className="flex items-center mb-4 backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group/phone"
                    >
                      <Phone className="text-pink-400 mr-3 flex-shrink-0 group-hover/phone:scale-110 transition-transform duration-300" size={18} />
                      <div>
                        <p className="text-gray-200 text-sm">
                          <span className="font-semibold text-white">Quick Call:</span>
                        </p>
                        <p className="text-pink-300 font-semibold text-sm group-hover/phone:text-pink-200">
                          {lawyer.phone}
                        </p>
                      </div>
                    </a>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className={`w-full bg-gradient-to-r ${lawyer.gradient} hover:shadow-xl text-white font-bold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                        <span className="mr-2">Find Lawyer</span>
                        <ChevronRight size={18} className="inline-block group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                      
                      <button className="w-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 px-6 rounded-xl border border-white/30 transform hover:scale-105 transition-all duration-300">
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Floating Background Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <IconComponent size={64} className="text-white" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-pulse">
                Ready to Win Your Case? ⚡
              </h2>
              <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Don't face legal battles alone. Connect with elite lawyers who turn challenges into victories! 🏆
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50">
                  <ExternalLink className="inline-block mr-3" size={22} />
                  Start Your Legal Journey
                </button>
                <button className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl text-lg border border-white/30 transform hover:scale-105 transition-all duration-300">
                  📱 Emergency Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer;