
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../types';
import '../styles/ActivitiesPage.css'; 
import ActivityDetailsModal from './ActivityDetailsModal'; 

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDate, setNewActivityDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null); 
  const [volunteerName, setVolunteerName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    
    const sampleActivities: Activity[] = [
      { id: 1, name: 'Organiziranje javnih manifestacija', date: '15. svibnja 2024. u 10:00', description: 'Uskoro', location: 'Splitsko-dalmatinska županija', organization: 'Udruga Riječna Pustolovina' },
      { id: 2, name: 'Individualno savjetovanje i edukacije', date: '20. svibnja 2024. u 14:00', description: 'Uskoro', location: 'Splitsko-dalmatinska županija', organization: 'Udruga Riječna Pustolovina' },
      { id: 3, name: 'Kampanje', date: '25. svibnja 2024. u 09:30', description: 'Uskoro', location: 'Splitsko-dalmatinska županija', organization: 'Udruga Riječna Pustolovina' },
    ];
    

    const sortedActivities = sampleActivities.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setActivities(sortedActivities);
  }, [sortOrder]);

  const handleAddActivity = () => {
    if (newActivityName && newActivityDate) {
      const newActivity: Activity = {
        id: activities.length + 1,
        name: newActivityName,
        date: newActivityDate,
      };
      setActivities([...activities, newActivity]);
      setNewActivityName('');
      setNewActivityDate('');
    }
  };

  const handleDeleteActivity = (id: number) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
  };

  const handleSortActivities = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Funkcija za prikaz detalja aktivnosti
  const handleShowActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div className="activities-container">
      <h1 className="activities-title">Aktivnosti</h1>
      <div>
        <input type="text" value={newActivityName} onChange={(e) => setNewActivityName(e.target.value)} placeholder="Naziv aktivnosti" />
        <input type="text" value={newActivityDate} onChange={(e) => setNewActivityDate(e.target.value)} placeholder="Datum i vrijeme" />
        <button onClick={handleAddActivity}>Dodaj aktivnost</button>
        <button onClick={handleSortActivities}>Sortiraj po datumu ({sortOrder === 'asc' ? 'najnovije' : 'najstarije'})</button>
      </div>
      <ul className="activities-list">
        {activities.map(activity => (
          <li key={activity.id}>
            <Link to="#" onClick={() => handleShowActivityDetails(activity)}>{activity.name}</Link>
            <span>{activity.date}</span>
            <button onClick={() => handleDeleteActivity(activity.id)}>Obriši</button>
          </li>
        ))}
      </ul>
      {/* Modal za prikaz detalja o aktivnosti */}
      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          volunteerName={volunteerName}
          setVolunteerName={setVolunteerName}
          participants={participants}
          setParticipants={setParticipants}
        />
      )}
    </div>
  );
}

export default ActivitiesPage;
