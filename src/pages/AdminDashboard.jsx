import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [sectors, setSectors] = useState([
    { id: 1, name: 'Sector A', code: 'SEC001', password: 'pass123', riskPercentage: 35 },
    { id: 2, name: 'Sector B', code: 'SEC002', password: 'pass456', riskPercentage: 62 },
    { id: 3, name: 'Sector C', code: 'SEC003', password: 'pass789', riskPercentage: 18 },
  ]);
  const [activeView, setActiveView] = useState('management');
  const [showModal, setShowModal] = useState(false);
  const [newSector, setNewSector] = useState({ name: '', code: '', password: '' });
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateSector = () => {
    if (newSector.name && newSector.code && newSector.password) {
      const sector = {
        id: sectors.length + 1,
        ...newSector,
        riskPercentage: Math.floor(Math.random() * 100),
      };
      setSectors([...sectors, sector]);
      setNewSector({ name: '', code: '', password: '' });
      setShowModal(false);
    }
  };

  const handleDeleteSector = (id) => {
    setSectors(sectors.filter(s => s.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveView('management')}
              className={`px-6 py-3 rounded font-semibold transition ${
                activeView === 'management'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Sector Management
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`px-6 py-3 rounded font-semibold transition ${
                activeView === 'reports'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Sector Reports
            </button>
          </div>

          {activeView === 'management' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sector Management</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                + Create New Sector
              </button>

              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h3 className="text-2xl font-bold mb-4">Create New Sector</h3>
                    <input
                      type="text"
                      placeholder="Sector Name"
                      value={newSector.name}
                      onChange={(e) => setNewSector({ ...newSector, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Sector Code"
                      value={newSector.code}
                      onChange={(e) => setNewSector({ ...newSector, code: e.target.value })}
                      className="w-full px-4 py-2 border rounded mb-3"
                    />
                    <input
                      type="password"
                      placeholder="Sector Password"
                      value={newSector.password}
                      onChange={(e) => setNewSector({ ...newSector, password: e.target.value })}
                      className="w-full px-4 py-2 border rounded mb-4"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateSector}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3 text-left">ID</th>
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Code</th>
                    <th className="border p-3 text-left">Password</th>
                    <th className="border p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sectors.map((sector) => (
                    <tr key={sector.id} className="hover:bg-gray-100">
                      <td className="border p-3">{sector.id}</td>
                      <td className="border p-3">{sector.name}</td>
                      <td className="border p-3">{sector.code}</td>
                      <td className="border p-3">{'*'.repeat(sector.password.length)}</td>
                      <td className="border p-3">
                        <button
                          onClick={() => handleDeleteSector(sector.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sector Risk Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectors.map((sector) => (
                  <div key={sector.id} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-bold mb-2">{sector.name}</h3>
                    <p className="text-gray-600 mb-3">Code: {sector.code}</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div
                        className={`h-4 rounded-full ${
                          sector.riskPercentage > 70
                            ? 'bg-red-500'
                            : sector.riskPercentage > 40
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${sector.riskPercentage}%` }}
                      />
                    </div>
                    <p className="font-bold text-lg">{sector.riskPercentage}% Risk</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;