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

type ContextType = {
  volunteersList: Volunteer[];
  getActivityTypes: () => void;
  getVolunteersList: () => Promise<Volunteer[]>; // Promijenjeno da vraća Promise
  setIsAdminMode: (isAdminMode: boolean) => void;
  isAdminMode: boolean;
  activityTypes: ActivityType[];
  addVolunteer: (newVolunteer: Volunteer) => Promise<void>; // Promijenjeno da vraća Promise
};

const initialContext: ContextType = {
  volunteersList: [],
  getActivityTypes: () => {},
  getVolunteersList: () => Promise.resolve([]),
  setIsAdminMode: () => {},
  isAdminMode: false,
  activityTypes: [],
  addVolunteer: () => Promise.resolve(),
};

const UserContext = createContext(initialContext);

export const UserContextProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [volunteersList, setVolunteersList] = useState<Volunteer[]>([]);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getVolunteersList = async (): Promise<Volunteer[]> => {
    try {
      const response = await axios.get('/podaci.json');
      const data = response.data as Volunteer[];
      if (data) {
        setVolunteersList(data);
        return data;
      }
      return [];
    } catch (error) {
      setError('Error fetching volunteers: ' + error.message);
      return [];
    }
  };
  

  const addVolunteer = async (newVolunteer: Volunteer): Promise<void> => {
    try {
      const id = Math.random().toString();
      const volunteerWithId = { ...newVolunteer, id };
      setVolunteersList([...volunteersList, volunteerWithId]);
      // Implementacija poziva API-ju za spremanje novog volontera u bazu podataka
    } catch (error) {
      setError('Error adding volunteer: ' + error.message);
    }
  };

  useEffect(() => {
    getActivityTypes();
    getVolunteersList();
  }, []);

  const value: ContextType = {
    volunteersList,
    getActivityTypes,
    getVolunteersList,
    setIsAdminMode,
    isAdminMode,
    activityTypes,
    addVolunteer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
