import React from 'react';

const issueTypes = {
  ac: ['Not Cooling', 'Not Turning On', 'Water Leakage', 'Noise Problem', 'Other'],
  refrigerator: ['Not Cooling', 'Leaking', 'No Power', 'Other'],
  'washing-machine': ['Not Spinning', 'Water Leakage', 'No Power', 'Other'],
  tv: ['No Display', 'No Sound', 'Remote Not Working', 'Other'],
  'water-purifier': ['Not Filtering', 'Water Leakage', 'No Power', 'Other'],
};

const IssueTypeSelection = ({ appliance, onSelect, onBack }) => {
  return (
    <div className="issue-type-selection">
      <button className="back-button" onClick={onBack}>Back</button>
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
