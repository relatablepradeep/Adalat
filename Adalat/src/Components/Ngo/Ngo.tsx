import React, { useState } from 'react';
import { Search, MapPin, Phone, Target, Filter, Sparkles, Heart } from 'lucide-react';
import ngoData from './Ngo.json';

const NGo = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('');
  
  const states = ngoData.map(entry => entry.state);
  const allOrganizations = ngoData.flatMap(entry => entry.organizations);
  const focusAreas = [...new Set(allOrganizations.map(org => org.focus_area))];
  
  const selectedOrganizations = ngoData.find(entry => entry.state === selectedState)?.organizations || [];
  
  const filteredOrganizations = selectedFocus 
    ? selectedOrganizations.filter(org => org.focus_area === selectedFocus)
    : selectedOrganizations;

  const getFocusIcon = (focus) => {
    switch(focus) {
      case 'Acid Attack Support': return '🛡️';
      case 'Domestic Violence': return '🤝';
      case 'Child Welfare': return '👶';
      case 'Mental Health': return '🧠';
      case 'Education': return '📚';
      case 'Healthcare': return '🏥';
      default: return '❤️';
    }
  };

  const getFocusColor = (focus) => {
    const colors = {
      'Acid Attack Support': 'from-red-400 to-pink-500',
      'Domestic Violence': 'from-purple-400 to-indigo-500',
      'Child Welfare': 'from-yellow-400 to-orange-500',
      'Mental Health': 'from-green-400 to-teal-500',
      'Education': 'from-blue-400 to-cyan-500',
      'Healthcare': 'from-indigo-400 to-purple-500'
    };
    return colors[focus] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 min-h-screen">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                NGO Finder
              </h2>
              <p className="text-sm text-gray-400">Find help that matters ✨</p>
            </div>
          </div>

          {/* State Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Select State
            </label>
            <select
              className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="" className="bg-gray-800 text-white">🌟 Choose your state</option>
              {states.map(state => (
                <option key={state} value={state} className="bg-gray-800 text-white">
                  📍 {state}
                </option>
              ))}
            </select>
          </div>

          {/* Focus Area Filter */}
          {selectedState && (
            <div className="mb-6 animate-fadeIn">
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4 text-purple-400" />
                Filter by Focus Area
              </label>
              <select
                className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
              >
                <option value="" className="bg-gray-800 text-white">🎯 All focus areas</option>
                {focusAreas.map(focus => (
                  <option key={focus} value={focus} className="bg-gray-800 text-white">
                    {getFocusIcon(focus)} {focus}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quick Stats */}
          {selectedState && (
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium">Quick Stats</span>
              </div>
              <div className="text-2xl font-bold text-pink-400">
                {filteredOrganizations.length}
              </div>
              <div className="text-xs text-gray-300">
                {selectedFocus ? `${selectedFocus} organizations` : 'Total organizations'}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Help is Here 💫
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Connect with NGOs that care. Find support, hope, and community in your area.
              </p>
            </div>

            {/* Organizations Grid */}
            {filteredOrganizations.length > 0 ? (
              <div className="grid gap-6">
                {filteredOrganizations.map((org, index) => (
                  <div 
                    key={index} 
                    className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 bg-gradient-to-r ${getFocusColor(org.focus_area)} rounded-xl text-2xl`}>
                          {getFocusIcon(org.focus_area)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                            {org.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Target className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-300 font-medium">{org.focus_area}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm text-gray-400 block">Address</span>
                          <span className="text-white">{org.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm text-gray-400 block">Phone</span>
                          <a 
                            href={`tel:${org.phone}`}
                            className="text-purple-300 hover:text-purple-200 transition-colors duration-300 font-medium"
                          >
                            {org.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1">
                        Get Help Now 🚀
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedState ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                  No organizations found
                </h3>
                <p className="text-gray-400">
                  {selectedFocus 
                    ? `No ${selectedFocus.toLowerCase()} organizations in ${selectedState}`
                    : `No organizations found for ${selectedState}`
                  }
                </p>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🗺️</div>
                <h3 className="text-3xl font-bold text-gray-300 mb-4">
                  Choose Your State
                </h3>
                <p className="text-xl text-gray-400 max-w-md mx-auto">
                  Select a state from the sidebar to discover amazing NGOs ready to help ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NGo;