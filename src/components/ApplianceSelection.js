import React from 'react';
import { MdAcUnit, MdKitchen, MdLocalLaundryService, MdTv, MdWaterDrop, MdMicrowave, MdDining, MdShower, MdAir, MdOutdoorGrill } from 'react-icons/md';

const appliances = [
  { id: 'ac', name: 'AC', icon: <MdAcUnit /> },
  { id: 'refrigerator', name: 'Refrigerator', icon: <MdKitchen /> },
  { id: 'washing-machine', name: 'Washing Machine', icon: <MdLocalLaundryService /> },
  { id: 'tv', name: 'TV', icon: <MdTv /> },
  { id: 'water-purifier', name: 'Water Purifier', icon: <MdWaterDrop /> },
  { id: 'microwave', name: 'Microwave', icon: <MdMicrowave /> },
  { id: 'dishwasher', name: 'Dishwasher', icon: <MdDining /> },
  { id: 'geyser', name: 'Geyser', icon: <MdShower /> },
  { id: 'chimney', name: 'Kitchen Chimney', icon: <MdAir /> },
  { id: 'oven', name: 'Oven', icon: <MdOutdoorGrill /> },
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
