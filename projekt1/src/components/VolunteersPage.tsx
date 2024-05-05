import { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import '../styles/VolunteersPage.css';

interface City {
  id: number;
  name: string;
}

interface Volunteer {
  id: number;
  name: string;
  city: City;
}



const VolunteersPage: React.FC = () => {
  const { activityTypes, getActivityTypes, getVolunteersList, volunteersList } = useContext(UserContext);
  const [volunteerListToDisplay, setVolunteerListToDisplay] = useState<Volunteer[]>([]);
  const [filterCity, setFilterCity] = useState<string>('');

  useEffect(() => {
    getActivityTypes();
    getVolunteersList();
  }, [getActivityTypes, getVolunteersList]);

  useEffect(() => {
    if (volunteersList.length && activityTypes.length) {
      const updatedList = volunteersList.map((volunteer) => {
        const newActivityTypes = activityTypes.filter(({ id }) => volunteer.activity_types.includes(id));
        return { ...volunteer, activity_types: newActivityTypes };
      });
      setVolunteerListToDisplay(updatedList);
    }
  }, [volunteersList, activityTypes]);

  const handleFilterVolunteers = () => {
    console.log("Filter city:", filterCity);
    if (filterCity) {
      const filteredVolunteers = sampleVolunteers.filter((volunteer) => volunteer.city.name === filterCity);
      console.log("Filtered volunteers:", filteredVolunteers);
      setVolunteerListToDisplay(filteredVolunteers);
    } else {
      setVolunteerListToDisplay(sampleVolunteers);
    }
  };
  
  
  
  const sampleVolunteers: Volunteer[] = [
    { id: 1, name: 'Marin Maric', city: { id: 1, name: 'Split' } },
    { id: 2, name: 'Ana Anic', city: { id: 2, name: 'Solin' } },
    { id: 3, name: 'Ivo Ivic', city: { id: 3, name: 'Sinj' } },
    { id: 4, name: 'Petar Peric', city: { id: 4, name: 'Omis' } },
    { id: 5, name: 'Jure Juric', city: { id: 5, name: 'Dugi Rat' } },
    { id: 6, name: 'Pero Peric', city: { id: 6, name: 'Kastela' } }
  ];
  

  return (
    <div className="activities-container">
      <h1 className="activities-title">Volonteri</h1>
      <div className="volunteer-grid">
      {sampleVolunteers.map(volunteer => (
  <div key={volunteer.id} className="volunteer-item">
    <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`} alt={volunteer.name} />
    <p>{volunteer.name}</p>
    <p>{volunteer.city.name}</p> {/* Prikazujemo samo ime grada */}
  </div>
))}

      </div>
      <div>
        <input type="text" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} placeholder="Filter by City" />
        <button onClick={handleFilterVolunteers}>Filter</button>
      </div>
    </div>
  );
}

export default VolunteersPage;
