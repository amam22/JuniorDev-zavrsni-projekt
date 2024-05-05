import { useState } from 'react';

interface ActivityDetailsModalProps {
  activity: Activity;
  volunteerName: string;
  setVolunteerName: React.Dispatch<React.SetStateAction<string>>;
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  closeModal: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, volunteerName, setVolunteerName, participants, setParticipants, closeModal }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  const handleAddVolunteer = () => {
    if (volunteerName.trim() !== '') {
      setParticipants([...participants, volunteerName]);
      setVolunteerName('');
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>{activity.name}</h2>
        <p>Detaljni opis: {activity.description}</p>
        <p>Organizacija: {activity.organization}</p>
        <p>Lokacija: {activity.location}</p>
        <p>Sudionici:</p>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
        <div>
          <input type="text" value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} placeholder="Ime i prezime volontera" />
          <button onClick={handleAddVolunteer}>Prijavi se</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
