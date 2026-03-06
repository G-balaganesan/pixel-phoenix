import React from 'react';

const SectorTable = ({ sectors, onDelete }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Sector ID</th>
            <th className="py-2 px-4 border">Threat Score</th>
            <th className="py-2 px-4 border">Risk Level</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map((sector) => (
            <tr key={sector.id}>
              <td className="py-2 px-4 border text-center">{sector.id}</td>
              <td className="py-2 px-4 border text-center">{sector.threatScore}</td>
              <td className="py-2 px-4 border text-center">
                <span className={`px-2 py-1 rounded text-white ${getRiskColor(sector.riskLevel)}`}>
                  {sector.riskLevel}
                </span>
              </td>
              <td className="py-2 px-4 border text-center">{sector.status}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={() => onDelete(sector.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectorTable;