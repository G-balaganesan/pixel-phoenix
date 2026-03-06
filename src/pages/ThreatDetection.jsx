import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ThreatDetection = () => {
  const [searchPattern, setSearchPattern] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Simulated pattern database for RAG-like matching
  const patternDatabase = [
    {
      id: 1,
      pattern: 'unusual network activity',
      threat: 'Cyber Attack',
      severity: 'HIGH',
      suggestedAction: 'Block suspicious IPs and escalate to cybersecurity team immediately. Implement DDoS mitigation protocols.',
    },
    {
      id: 2,
      pattern: 'unauthorized access attempt',
      threat: 'Intrusion',
      severity: 'HIGH',
      suggestedAction: 'Activate multi-factor authentication. Alert security personnel. Review access logs and lockdown sensitive areas.',
    },
    {
      id: 3,
      pattern: 'data exfiltration signs',
      threat: 'Data Breach',
      severity: 'HIGH',
      suggestedAction: 'Isolate affected systems immediately. Preserve evidence. Notify data protection authorities.',
    },
    {
      id: 4,
      pattern: 'operational anomaly detected',
      threat: 'System Malfunction',
      severity: 'MEDIUM',
      suggestedAction: 'Identify root cause. Run diagnostics. Document anomaly for analysis.',
    },
    {
      id: 5,
      pattern: 'unusual signal pattern',
      threat: 'Unknown Interference',
      severity: 'MEDIUM',
      suggestedAction: 'Increase monitoring frequency. Cross-verify with other sensors. Report to RF management.',
    },
    {
      id: 6,
      pattern: 'normal activity',
      threat: 'No Threat',
      severity: 'LOW',
      suggestedAction: 'Continue routine monitoring. No action required.',
    },
  ];

  const simulateDetection = async () => {
    if (!searchPattern.trim()) {
      alert('Please enter a search pattern');
      return;
    }

    setIsAnalyzing(true);

    // Simulate RAG-like pattern matching
    setTimeout(() => {
      let matchedPattern = null;
      const lowerPattern = searchPattern.toLowerCase();

      // Find best match from database
      for (let pattern of patternDatabase) {
        if (pattern.pattern.toLowerCase().includes(lowerPattern) || lowerPattern.includes(pattern.pattern.toLowerCase())) {
          matchedPattern = pattern;
          break;
        }
      }

      // If no direct match, select a random pattern for simulation
      if (!matchedPattern) {
        matchedPattern = patternDatabase[Math.floor(Math.random() * patternDatabase.length)];
      }

      // Add confidence score
      const confidenceScore = Math.floor(Math.random() * 30 + 70); // 70-100%

      setDetectionResult({
        ...matchedPattern,
        confidenceScore,
        timestamp: new Date().toLocaleString(),
        searchedPattern: searchPattern,
      });

      setIsAnalyzing(false);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
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
            <h1 className="text-3xl font-bold text-gray-800">Threat Detection</h1>
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
            <h2 className="text-2xl font-bold mb-4">Search Pattern Prediction</h2>
            <p className="text-gray-600 mb-4">Enter a threat pattern to search and match against our database</p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchPattern}
                onChange={(e) => setSearchPattern(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && simulateDetection()}
                placeholder="e.g., unusual network activity, unauthorized access, data breach..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={simulateDetection}
                disabled={isAnalyzing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
              >
                {isAnalyzing ? 'Analyzing...' : 'Search'}
              </button>
            </div>

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Searching database and matching patterns...</p>
                </div>
              </div>
            )}

            {detectionResult && !isAnalyzing && (
              <div className="space-y-6">
                {/* Detection Result Header */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
                  <div>
                    <p className="text-gray-600 text-sm">Searched Pattern</p>
                    <p className="text-lg font-semibold text-gray-800">"{detectionResult.searchedPattern}"</p>
                  </div>
                  <div className="text-right">
                      <p className="text-gray-600 text-sm">Match Confidence</p>
                    <p className="text-3xl font-bold text-blue-600">{detectionResult.confidenceScore}%</p>
                  </div>
                </div>

                {/* Threat Information */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Detected Threat</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600 text-sm">Threat Type</p>
                      <p className="text-lg font-bold">{detectionResult.threat}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600 text-sm">Severity</p>
                      <div className={`inline-block px-3 py-1 rounded text-white font-bold ${getSeverityColor(detectionResult.severity)}`}>
                        {detectionResult.severity}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600 text-sm">Timestamp</p>
                      <p className="text-xs">{detectionResult.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className={`p-4 rounded-lg border-2 ${
                  detectionResult.severity === 'HIGH'
                    ? 'border-red-500 bg-red-50'
                    : detectionResult.severity === 'MEDIUM'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-green-500 bg-green-50'
                }`}>
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    🤖 AI Response & Suggestion
                  </h3>
                  <p className="text-gray-800 leading-relaxed">{detectionResult.suggestedAction}</p>
                </div>

                {/* Document Matching Info */}
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h3 className="font-bold mb-2">📚 Document Matching (RAG)</h3>
                  <p className="text-gray-700 text-sm">
                    Pattern matched against pre-installed threat database. This analysis is based on historical data,
                    standard security protocols, and AI-generated recommendations for the detected scenario.
                  </p>
                </div>
              </div>
            )}

            {!detectionResult && !isAnalyzing && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter a search pattern above and click Search to analyze threats</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;