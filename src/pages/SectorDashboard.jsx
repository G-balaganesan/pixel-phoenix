import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const SectorDashboard = () => {
  const [frequency, setFrequency] = useState(45);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Simulate real-time frequency updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFrequency(Math.floor(Math.random() * 100) + 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSignalColor = (freq) => {
    if (freq > 70) return 'text-red-500';
    if (freq > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sector Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Real-time Signal Indicator */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Real-Time Frequency Monitoring</h2>
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className={`text-6xl font-bold mb-2 ${getSignalColor(frequency)}`}>
                  {frequency}
                </div>
                <p className="text-gray-600">Frequency (MHz)</p>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-full transition ${
                      i < Math.round(frequency / 10)
                        ? 'bg-blue-500 h-12'
                        : 'bg-gray-300 h-6'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate('/risk-analysis')}
              className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg p-8 hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-2">Risk Analysis</h3>
              <p className="text-sm text-yellow-100">View risk levels and AI-predicted percentages</p>
            </button>

            <button
              onClick={() => navigate('/threat-detection')}
              className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-lg p-8 hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-2">Threat Detection</h3>
              <p className="text-sm text-red-100">Search patterns and get AI suggestions</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDashboard;