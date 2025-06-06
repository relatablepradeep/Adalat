import React, { useEffect, useState } from 'react';
import articlesJSON from './Rules/Articles/Articles.json';
import surakshaJSON from './Rules/bhartiya-nagrink-suraksa-sanhita/BhartiyaNagrikSuraksaSanhita.json';
import nyayJSON from './Rules/bhartiya-nayy-sanhita/BhartiyaNayySanhita.json';
import ipcJSON from './Rules/IPC/ipc.json';
import personalLawJSON from './Rules/personal-law/personalLaw.json';
import specialActsJSON from './Rules/special-acts/SpecialActs.json';
import taxLawJSON from './Rules/tax-laws/taxAndLaw.json';

const Laws = () => {
  const [selectedData, setSelectedData] = useState(null);

  const lawFiles = [
    { name: 'Articles from Constitution of India', data: articlesJSON.constitution_of_india || [] },
    { name: 'Bharatiya Nagarik Suraksha Sanhita (Chapters)', data: surakshaJSON.chapters || [] },
    { name: 'Bhartiya Nyay Sanhita (Chapters)', data: nyayJSON.chapters || [] },
    { name: 'IPC Data', data: ipcJSON || [] },
    { name: 'Personal Laws', data: personalLawJSON.personal_laws || [] },
    { name: 'Special Acts', data: specialActsJSON.acts || [] },
    { name: 'Tax Laws', data: taxLawJSON.tax_laws || [] }
  ];

  const handleClick = (data) => {
    setSelectedData(data);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with clickable list */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '1rem' }}>
        <h3>Choose a JSON file:</h3>
        <ul>
          {lawFiles.map((file, index) => (
            <li key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick(file)}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Display area for selected JSON data */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>{selectedData ? selectedData.name : 'Select a JSON file to view data'}</h2>
        {selectedData && (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(selectedData.data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default Laws;
