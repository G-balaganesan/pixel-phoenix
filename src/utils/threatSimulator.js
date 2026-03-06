const simulateThreat = () => {
  const score = Math.floor(Math.random() * 101);
  let riskLevel;
  let suggestion;

  if (score > 70) {
    riskLevel = 'HIGH';
    suggestion = 'Immediate action required';
  } else if (score > 40) {
    riskLevel = 'MEDIUM';
    suggestion = 'Monitor closely';
  } else {
    riskLevel = 'LOW';
    suggestion = 'No immediate threat';
  }

  return { score, riskLevel, suggestion };
};

export default simulateThreat;