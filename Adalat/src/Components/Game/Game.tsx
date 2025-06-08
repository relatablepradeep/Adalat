import React, { useState, useEffect } from 'react';
import scenarios from './Game.json';

const Game = () => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [result, setResult] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [orbs, setOrbs] = useState([]);

  // Generate floating orbs
  useEffect(() => {
    const generateOrbs = () => {
      const newOrbs = [];
      for (let i = 0; i < 8; i++) {
        newOrbs.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
      setOrbs(newOrbs);
    };
    generateOrbs();
  }, []);

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setResult('');
    setIsCorrect(null);
  };

  const chooseOption = (option) => {
    setResult(option.result);
    setIsCorrect(option.correct);
  };

  const resetGame = () => {
    setCurrentScenario(null);
    setResult('');
    setIsCorrect(null);
  };

  const orbStyle = (orb) => ({
    position: 'absolute',
    left: `${orb.x}%`,
    top: `${orb.y}%`,
    width: `${orb.size}px`,
    height: `${orb.size}px`,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.3))',
    backdropFilter: 'blur(2px)',
    animation: `float ${orb.duration}s ease-in-out infinite ${orb.delay}s alternate`,
    opacity: orb.opacity,
    pointerEvents: 'none',
    zIndex: 1
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6B46C1 0%, #3B82F6 35%, #6366F1 70%, #4F46E5 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Orbs */}
      {orbs.map(orb => (
        <div key={orb.id} style={orbStyle(orb)} />
      ))}
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {!currentScenario ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'slideIn 0.8s ease-out'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '1rem',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(135deg, #FBBF24, #F59E0B, #D97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              Justice Quest: India Edition
            </h1>
            <p style={{
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.2rem',
              textAlign: 'center',
              fontWeight: '300'
            }}>
              Choose a scenario to begin your legal journey and test your knowledge of Indian law.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {scenarios.map((scenario, index) => (
                <div
                  key={scenario.id}
                  onClick={() => startScenario(scenario)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '2rem',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                    transform: 'translateY(0)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-8px) scale(1.02)';
                    e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))';
                    e.target.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
                    e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}>
                    {scenario.title}
                  </h2>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'slideIn 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {currentScenario.title}
            </h2>
            <p style={{
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              {currentScenario.description}
            </p>
            
            {result ? (
              <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <div style={{
                  background: isCorrect 
                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))'
                    : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
                  border: `2px solid ${isCorrect ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <p style={{
                    color: isCorrect ? '#10B981' : '#EF4444',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: '1rem'
                  }}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {result}
                  </p>
                  {isCorrect && currentScenario.options.find(o => o.correct)?.explanation && (
                    <p style={{
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.8)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '1rem',
                      borderRadius: '12px',
                      borderLeft: '4px solid #10B981',
                      lineHeight: '1.6'
                    }}>
                      💡 {currentScenario.options.find(o => o.correct)?.explanation}
                    </p>
                  )}
                </div>
                <button
                  onClick={resetGame}
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  ← Back to Scenarios
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {currentScenario.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => chooseOption(option)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideUp 0.4s ease-out ${index * 0.1}s both`,
                      boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateX(8px) scale(1.02)';
                      e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))';
                      e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateX(0) scale(1)';
                      e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
                      e.target.style.boxShadow = '0 5px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes glow {
          from {
            filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.5));
          }
          to {
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Game;