
interface Activity {
  id: number;
  name: string;
  date: string;
  description: string;
  organization: string;
  location: string;
}

  
  type volonteri = {
    id: number;
    name: string;
    city: string;
  };

  export interface Organization {
    id: number;
    name: string;
    address: string;
    city: string;
  }


  interface User {
    id: number;
    username: string;
    role: 'user' | 'admin'; // Dodali smo atribut uloge
  }
  