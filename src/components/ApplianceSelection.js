import React from 'react';

const appliances = [
  { id: 'ac', name: 'AC', icon: '/icons/ac.png' },
  { id: 'refrigerator', name: 'Refrigerator', icon: '/icons/refrigerator.png' },
  { id: 'washing-machine', name: 'Washing Machine', icon: '/icons/washing-machine.png' },
  { id: 'tv', name: 'TV', icon: '/icons/tv.png' },
  { id: 'water-purifier', name: 'Water Purifier', icon: '/icons/water-purifier.png' },
];

const ApplianceSelection = ({ onSelect }) => {
  return (
    <div className="appliance-selection-grid">
      {appliances.map((appliance) => (
        <div
          key={appliance.id}
          className="appliance-tile"
          onClick={() => onSelect(appliance)}
        >
          <img src={appliance.icon} alt={appliance.name} className="appliance-icon" />
          <span className="appliance-name">{appliance.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ApplianceSelection;
