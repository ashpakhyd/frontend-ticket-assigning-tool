import React, { useState } from 'react';

const MinimalTicketForm = ({ appliance, issue, onBack, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('123 Main St, City');
  const [timeSlot, setTimeSlot] = useState('');
  const [urgency, setUrgency] = useState('');

  const isFormValid = description && timeSlot && urgency;

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({
        title: `${appliance.name} - ${issue}`,
        appliance: appliance.name,
        issue,
        description,
        address,
        timeSlot,
        urgency,
      });
    }
  };

  return (
    <div className="ticket-form">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Create Ticket for {appliance.name} - {issue}</h2>
      <textarea
        placeholder="Describe the problem"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Service Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
        <option value="">Preferred Time Slot</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
        <option value="">Urgency Level</option>
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
      </select>
      <button className="create-ticket-button" disabled={!isFormValid} onClick={handleSubmit}>
        Create Ticket
      </button>
    </div>
  );
};

export default MinimalTicketForm;
