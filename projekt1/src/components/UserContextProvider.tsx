import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export type Volunteer = {
  id: string;
  ime: string;
  prezime: string;
  grad: string;
};

type ActivityType = {
  id: string;
  name: string;
};

// Definicija tipa za kontekst
type ContextType = {
  volunteersList: Volunteer[];
  getActivityTypes: () => void;
  getVolunteersList: () => void;
  setIsAdminMode: (isAdminMode: boolean) => void;
  isAdminMode: boolean;
  activityTypes: ActivityType[];
  addVolunteer: (newVolunteer: Volunteer) => void; 
};


// Početni kontekst
const initialContext: ContextType = {
  volunteersList: [],
  getActivityTypes: () => {},
  getVolunteersList: () => {},
  setIsAdminMode: () => {},
  isAdminMode: false,
  activityTypes: [],
  addVolunteer: () => {}, // Promijenjeno: Prazna funkcija koja se može zamijeniti pravom funkcijom
};

const UserContext = createContext(initialContext);

// Provider komponenta koja sadrži logiku za dohvat podataka i upravljanje stanjem
export const UserContextProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [volunteersList, setVolunteersList] = useState<Volunteer[]>([]);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [error, setError] = useState<string | null>(null);


  const getVolunteersList = async (): Promise<Volunteer[]> => {
    try {
      const response = await axios.get('/podaci.json');
      const data = response.data;
      if (data && data.volonteri) {
        return data.volonteri;
      }
      return []; // Vratite prazan niz ako nema podataka
    } catch (error) {
      setError('Error fetching volunteers: ' + error.message);
      return []; // Vratite prazan niz u slučaju greške
    }
  };
  
  
  const addVolunteer = async (newVolunteer: Volunteer) => {
    try {
      // Dodajte id novom volonteru
      const id = Math.random().toString(); // Ovo nije najbolji način dodjele id-a, ali je samo za ilustraciju
      const volunteerWithId = { ...newVolunteer, id };
  
      // Dodaj novog volontera na postojeću listu volontera
      setVolunteersList([...volunteersList, volunteerWithId]);
      // Ako imate backend, ovdje možete implementirati poziv API-ju za spremanje novog volontera u bazu podataka
    } catch (error) {
      setError('Error adding volunteer: ' );
    }
  };
  

  useEffect(() => {
    setActivityTypes([]); // Ovdje postavljamo prazan niz activityTypes
    getVolunteersList();
  }, []);

  // Vrijednost konteksta koja se proslijeđuje potrošačima
  const value: ContextType = {
    volunteersList,
    getActivityTypes: () => {}, // Ovdje treba dodati pravu funkciju za dohvat tipova aktivnosti
    getVolunteersList,
    setIsAdminMode,
    isAdminMode,
    activityTypes,
    addVolunteer,
  };

  // Vraćamo Provider s vrijednošću konteksta
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
