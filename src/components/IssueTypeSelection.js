import React from 'react';

const issueTypes = {
  ac: ['Not Cooling', 'Not Turning On', 'Water Leakage', 'Noise Problem', 'Remote Issue', 'Gas Leakage', 'Other'],
  refrigerator: ['Not Cooling', 'Leaking', 'No Power', 'Ice Formation', 'Door Issue', 'Compressor Problem', 'Other'],
  'washing-machine': ['Not Spinning', 'Water Leakage', 'No Power', 'Drainage Issue', 'Door Lock Problem', 'Vibration', 'Other'],
  tv: ['No Display', 'No Sound', 'Remote Not Working', 'Screen Flickering', 'HDMI Issue', 'WiFi Problem', 'Other'],
  'water-purifier': ['Not Filtering', 'Water Leakage', 'No Power', 'Low Water Flow', 'Filter Change', 'Taste Issue', 'Other'],
  microwave: ['Not Heating', 'No Power', 'Door Issue', 'Turntable Problem', 'Display Issue', 'Sparking', 'Other'],
  dishwasher: ['Not Cleaning', 'Water Leakage', 'No Power', 'Drainage Issue', 'Door Problem', 'Soap Dispenser', 'Other'],
  geyser: ['No Hot Water', 'Water Leakage', 'No Power', 'Temperature Issue', 'Pressure Problem', 'Thermostat Issue', 'Other'],
  chimney: ['Not Working', 'No Power', 'Filter Issue', 'Noise Problem', 'Light Problem', 'Remote Issue', 'Other'],
  oven: ['Not Heating', 'No Power', 'Door Issue', 'Temperature Problem', 'Timer Issue', 'Light Problem', 'Other'],
};

const IssueTypeSelection = ({ appliance, onSelect, onBack }) => {
  return (
    <div className="issue-type-selection">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h2>Select Issue for {appliance.name}</h2>
      <div className="issue-list">
        {issueTypes[appliance.id].map((issue, index) => (
          <div
            key={index}
            className="issue-card"
            onClick={() => onSelect(issue)}
          >
            {issue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueTypeSelection;
