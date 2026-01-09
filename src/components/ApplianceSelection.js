import React from 'react';

const appliances = [
  { id: 'ac', name: 'AC', icon: '❄️' },
  { id: 'refrigerator', name: 'Refrigerator', icon: '🧊' },
  { id: 'washing-machine', name: 'Washing Machine', icon: '👕' },
  { id: 'tv', name: 'TV', icon: '📺' },
  { id: 'water-purifier', name: 'Water Purifier', icon: '💧' },
  { id: 'microwave', name: 'Microwave', icon: '🔥' },
  { id: 'dishwasher', name: 'Dishwasher', icon: '🍽️' },
  { id: 'geyser', name: 'Geyser', icon: '🚿' },
  { id: 'chimney', name: 'Kitchen Chimney', icon: '💨' },
  { id: 'oven', name: 'Oven', icon: '🔥' },
];

const ApplianceSelection = ({ onSelect }) => {
  return (
    <div className="appliance-selection-container">
      <h2>Select Appliance</h2>
      <div className="appliance-selection-grid">
        {appliances.map((appliance) => (
          <div
            key={appliance.id}
            className="appliance-tile"
            onClick={() => onSelect(appliance)}
          >
            <div className="appliance-icon">{appliance.icon}</div>
            <span className="appliance-name">{appliance.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceSelection;
