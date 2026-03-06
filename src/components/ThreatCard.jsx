import React from 'react';

const ThreatCard = ({ threat }) => {
  const getCardColor = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-red-100 border-red-500';
      case 'MEDIUM':
        return 'bg-yellow-100 border-yellow-500';
      case 'LOW':
        return 'bg-green-100 border-green-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  if (!threat) return null;

  return (
    <div className={`p-4 rounded-lg border-2 shadow-md ${getCardColor(threat.riskLevel)}`}>
      <h3 className="text-lg font-bold mb-2">Threat Analysis Result</h3>
      <p><strong>Threat Score:</strong> {threat.score}</p>
      <p><strong>Risk Level:</strong> {threat.riskLevel}</p>
      <p><strong>Suggested Action:</strong> {threat.suggestion}</p>
    </div>
  );
};

export default ThreatCard;