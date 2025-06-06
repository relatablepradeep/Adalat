
import React, { useState } from 'react';
import ngoData from './Ngo.json';

const NGo = () => {
  const [selectedState, setSelectedState] = useState('');
  
  const states = ngoData.map(entry => entry.state);
  const selectedOrganizations =
    ngoData.find(entry => entry.state === selectedState)?.organizations || [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select State to View Organizations</h1>
      
      <select
        className="border px-4 py-2 rounded-md w-full mb-6"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">-- Select State --</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {selectedOrganizations.length > 0 ? (
        <ul className="space-y-4">
          {selectedOrganizations.map((org, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{org.name}</h2>
              <p><strong>Focus Area:</strong> {org.focus_area}</p>
              <p><strong>Address:</strong> {org.address}</p>
              <p><strong>Phone:</strong> {org.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        selectedState && <p>No organizations found for {selectedState}</p>
      )}
    </div>
  );
};

export default NGo;
