import React, { useState } from 'react';
import { Activity } from '../types';

interface Props {
  activity: Activity;
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  closeModal: () => void;
}

const ActivityDetailsModal: React.FC<Props> = ({ activity, participants, setParticipants, closeModal }) => {
  const [volunteerName, setVolunteerName] = useState<string>('');

  const handleAddVolunteer = () => {
    if (volunteerName) {
      setParticipants([...participants, volunteerName]);
      setVolunteerName('');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{activity.name}</h2>
        <p><strong>Datum i vrijeme:</strong> {activity.date}</p>
        <p><strong>Opis:</strong> {activity.description}</p>
        <p><strong>Organizacija:</strong> {activity.organization}</p>
        <p><strong>Lokacija:</strong> {activity.location}</p>

        <h3>Sudionici:</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        <div>
          <input type="text" value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} placeholder="Ime i prezime volontera" />
          <button onClick={handleAddVolunteer}>Dodaj volontera</button>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsModal;
