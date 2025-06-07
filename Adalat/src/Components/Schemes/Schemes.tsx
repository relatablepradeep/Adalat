import React, { useState, useEffect } from 'react';
import { Calendar, Users } from 'lucide-react';

const Schemes = () => {
  const [activeTab, setActiveTab] = useState('agriculture');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const tabs = [
    { id: 'agriculture', label: '🌾 Agriculture & Farmers Welfare', gradient: 'from-purple-500 via-pink-500 to-red-500' },
    { id: 'health', label: '🏥 Health & Nutrition', gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
    { id: 'education', label: '📚 Education & Skills', gradient: 'from-green-500 via-emerald-500 to-cyan-500' },
    { id: 'employment', label: '💼 Employment & Entrepreneurship', gradient: 'from-yellow-500 via-orange-500 to-red-500' },
    { id: 'housing', label: '🏠 Housing & Urban Development', gradient: 'from-indigo-500 via-purple-500 to-pink-500' }
  ];

  const schemes = {
    agriculture: [
      {
        id: 1,
        title: 'Viksit Krishi Sankalp Abhiyan',
        titleEn: 'Viksit Krishi Sankalp Abhiyan',
        description: 'A nationwide campaign to educate farmers on modern agricultural practices, quality seeds, and soil-test-based fertilizers.',
        impact: 'high',
        beneficiaries: '839,000 farmers',
        status: 'active',
        icon: '🌱',
        launchDate: '29 May, 2025'
      },
      {
        id: 2,
        title: 'Pradhan Mantri Fasal Bima Yojana',
        titleEn: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Provides comprehensive crop insurance to farmers against natural disasters, pests, and diseases.',
        impact: 'high',
        beneficiaries: '55 million farmers',
        status: 'active',
        icon: '🛡️',
        launchDate: '2016'
      },
      {
        id: 3,
        title: 'Mission for Aatmanirbharta in Pulses',
        titleEn: 'Mission for Aatmanirbharta in Pulses',
        description: 'A six-year mission to achieve self-reliance in pulses like urad, tur, and masoor.',
        impact: 'medium',
        beneficiaries: '100 districts',
        status: 'active',
        icon: '🫘',
        launchDate: '2024'
      }
    ],
    health: [
      {
        id: 4,
        title: 'Ayushman Bharat - PM Jan Arogya Yojana',
        titleEn: 'Ayushman Bharat - PM Jan Arogya Yojana',
        description: 'Health insurance coverage of up to ₹5 lakh per family per year.',
        impact: 'high',
        beneficiaries: '120 million families',
        status: 'active',
        icon: '💊',
        launchDate: '2018'
      },
      {
        id: 5,
        title: 'Saksham Anganwadi and Poshan 2.0',
        titleEn: 'Saksham Anganwadi and Poshan 2.0',
        description: 'Nutritional support to 80 million children, 10 million lactating mothers, and pregnant women.',
        impact: 'high',
        beneficiaries: '90 million+',
        status: 'active',
        icon: '👶',
        launchDate: '2021'
      },
      {
        id: 6,
        title: 'PM Garib Kalyan Anna Yojana',
        titleEn: 'PM Garib Kalyan Anna Yojana',
        description: '5 kg of rice or wheat per person and 1 kg of pulses per family for ration card holders.',
        impact: 'high',
        beneficiaries: '800 million',
        status: 'active',
        icon: '🍚',
        launchDate: '2020'
      }
    ],
    education: [
      {
        id: 7,
        title: 'National Education Mission (Samagra Shiksha)',
        titleEn: 'National Education Mission (Samagra Shiksha)',
        description: 'A comprehensive program for school education from pre-school to class 12.',
        impact: 'high',
        beneficiaries: '250 million students',
        status: 'active',
        icon: '📖',
        launchDate: '2018'
      },
      {
        id: 8,
        title: 'Bharatiya Bhasha Pustak Scheme',
        titleEn: 'Bharatiya Bhasha Pustak Scheme',
        description: 'Providing digital books in Indian languages for schools and higher education.',
        impact: 'medium',
        beneficiaries: '5 million students',
        status: 'active',
        icon: '📱',
        launchDate: '2024'
      },
      {
        id: 9,
        title: 'PM-POSHAN (Midday Meal Scheme)',
        titleEn: 'PM-POSHAN (Midday Meal Scheme)',
        description: 'Free mid-day meals for children in government primary and upper primary schools.',
        impact: 'high',
        beneficiaries: '120 million children',
        status: 'active',
        icon: '🍽️',
        launchDate: '1995'
      }
    ],
    employment: [
      {
        id: 10,
        title: 'Scheme for First-time Entrepreneurs',
        titleEn: 'Scheme for First-time Entrepreneurs',
        description: 'Term loan up to ₹2 crore for 500,000 women, Scheduled Tribes, and Scheduled Castes.',
        impact: 'high',
        beneficiaries: '500,000 entrepreneurs',
        status: 'active',
        icon: '💰',
        launchDate: '2024'
      },
      {
        id: 11,
        title: 'Rural Prosperity and Resilience Programme',
        titleEn: 'Rural Prosperity and Resilience Programme',
        description: 'A multi-sectoral initiative to address agricultural unemployment through investment, technology, and skills.',
        impact: 'medium',
        beneficiaries: '20 million rural people',
        status: 'active',
        icon: '🚜',
        launchDate: '2023'
      },
      {
        id: 12,
        title: 'Social Security Scheme for Online Platform Workers',
        titleEn: 'Social Security Scheme for Online Platform Workers',
        description: 'Register gig workers on the e-Shram portal and provide health services under PM-JAY.',
        impact: 'medium',
        beneficiaries: '5 million gig workers',
        status: 'active',
        icon: '📱',
        launchDate: '2023'
      }
    ],
    housing: [
      {
        id: 13,
        title: 'Pradhan Mantri Gramin Awas Yojana',
        titleEn: 'Pradhan Mantri Gramin Awas Yojana',
        description: 'Target to construct an additional 20 million rural houses by 2028-29.',
        impact: 'high',
        beneficiaries: '20 million families',
        status: 'active',
        icon: '🏡',
        launchDate: '2016'
      },
      {
        id: 14,
        title: 'SWAMIH Fund 2',
        titleEn: 'Special Window for Affordable Housing',
        description: 'A fund of ₹15,000 crore to complete 100,000 housing units.',
        impact: 'medium',
        beneficiaries: '100,000 families',
        status: 'active',
        icon: '🏢',
        launchDate: '2021'
      }
    ]
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTabGradient = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab ? tab.gradient : 'from-gray-500 to-gray-600';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate floating orbs if needed
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-600/25 to-teal-600/25 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 relative z-10 text-white">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          Government Schemes and Initiatives
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-full font-semibold transition-colors duration-300
                ${activeTab === tab.id ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` : 'bg-gray-700/40 hover:bg-gray-700/60 text-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schemes[activeTab].map(scheme => (
            <div
              key={scheme.id}
              onMouseEnter={() => setHoveredCard(scheme.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative p-6 rounded-2xl bg-gradient-to-br
                ${getImpactColor(scheme.impact)}
                shadow-xl transform transition-transform duration-300
                ${hoveredCard === scheme.id ? 'scale-105 shadow-2xl' : ''}
                fadeInUp
              `}
            >
              <div className="text-5xl mb-4">{scheme.icon}</div>
              <h3 className="text-xl font-bold mb-2">{scheme.title}</h3>
              <p className="mb-4 text-sm opacity-90">{scheme.description}</p>
              <div className="flex items-center justify-between text-sm font-medium opacity-80">
                <div className="flex items-center space-x-1">
                  <Users size={16} /> 
                  <span>{scheme.beneficiaries}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{scheme.launchDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
