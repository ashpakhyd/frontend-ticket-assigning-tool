import React from 'react';
import { useForm } from 'react-hook-form';

const MinimalTicketForm = ({ appliance, issue, onBack, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    defaultValues: {
      description: '',
      address: '123 Main St, City',
      timeSlot: '',
      urgency: ''
    },
    mode: 'onChange'
  });

  const onFormSubmit = (data) => {
    onSubmit({
      title: `${appliance.name} - ${issue}`,
      appliance: appliance.name,
      issue,
      ...data
    });
  };

  return (
    <div className="ticket-form">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Create Ticket for {appliance.name} - {issue}</h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <textarea
          placeholder="Describe the problem"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
        
        <input
          type="text"
          placeholder="Service Address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
        
        <select {...register('timeSlot', { required: 'Time slot is required' })}>
          <option value="">Preferred Time Slot</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        {errors.timeSlot && <span className="error">{errors.timeSlot.message}</span>}
        
        <select {...register('urgency', { required: 'Urgency level is required' })}>
          <option value="">Urgency Level</option>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </select>
        {errors.urgency && <span className="error">{errors.urgency.message}</span>}
        
        <button 
          type="submit" 
          className="create-ticket-button" 
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
};

export default MinimalTicketForm;
