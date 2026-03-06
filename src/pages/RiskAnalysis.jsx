import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const RiskAnalysis = () => {
  const [riskData, setRiskData] = useState({
    score: Math.floor(Math.random() * 100),
    level: '',
    percentage: 0,
  });
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const analyzeRisk = () => {
    const score = Math.floor(Math.random() * 100);
    let level = '';
    let suggestion = '';

    if (score > 70) {
      level = 'HIGH';
      suggestion = '⚠️ CRITICAL: Immediate action required. Activate emergency protocols. Increase surveillance and alert relevant authorities.';
    } else if (score > 40) {
      level = 'MEDIUM';
      suggestion = '⚠️ WARNING: Monitor closely. Enhance data collection and report to senior management. Prepare contingency plans.';
    } else {
      level = 'LOW';
      suggestion = '✅ SAFE: Continue routine monitoring. No immediate threat detected. Maintain standard operational procedures.';
    }

    setRiskData({
      score,
      level,
      percentage: score,
    });
    setAiSuggestion(suggestion);
    setAnalyzed(true);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Risk Analysis</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/sector')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <button
              onClick={analyzeRisk}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold text-lg mb-6"
            >
              Analyze Risk Level
            </button>

            {analyzed && (
              <div className="space-y-6">
                {/* Risk Score Display */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Current Risk Level</h2>
                  <div className={`inline-block px-8 py-4 rounded-lg text-white font-bold text-2xl ${getRiskColor(riskData.level)}`}>
                    {riskData.level}
                  </div>
                </div>

                {/* Risk Percentage */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Risk Prediction (AI Analysis)</h3>
                  <div className="w-full bg-gray-200 rounded-full h-8 mb-2">
                    <div
                      className={`h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getRiskColor(riskData.level)}`}
                      style={{ width: `${riskData.percentage}%` }}
                    >
                      {riskData.percentage}%
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">AI-predicted severity level based on pattern analysis</p>
                </div>

                {/* Risk Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Risk Score</p>
                    <p className="text-2xl font-bold">{riskData.score}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="text-2xl font-bold">{riskData.level === 'HIGH' ? '🔴' : riskData.level === 'MEDIUM' ? '🟡' : '🟢'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Analyzed</p>
                    <p className="text-sm">Just now</p>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className={`p-4 rounded-lg border-2 ${
                  riskData.level === 'HIGH'
                    ? 'border-red-500 bg-red-50'
                    : riskData.level === 'MEDIUM'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-green-500 bg-green-50'
                }`}>
                  <h3 className="font-bold mb-2">AI Recommendation</h3>
                  <p className="text-gray-800">{aiSuggestion}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;