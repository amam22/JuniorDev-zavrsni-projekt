import React, { useState } from 'react';
import '../App.css';

const AddVolunteerPage: React.FC = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerCity, setVolunteerCity] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (volunteerName && volunteerCity) {
        // Ovdje bi bio poziv API-ju za dodavanje volontera
        console.log('Volunteer added successfully!');
        setVolunteerName('');
        setVolunteerCity('');
        setError(null);
      } else {
        setError('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add volunteer');
    }
  };

  return (
    <div>
      <h1>Add New Volunteer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Volunteer Name:
          <input type="text" value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} />
        </label>
        <label>
          Volunteer City:
          <input type="text" value={volunteerCity} onChange={(e) => setVolunteerCity(e.target.value)} />
        </label>
        <button type="submit">Add Volunteer</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddVolunteerPage;
