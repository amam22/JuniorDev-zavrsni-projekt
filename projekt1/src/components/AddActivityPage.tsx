import { useState } from 'react';

const AddActivityPage: React.FC = () => {
  const [activityName, setActivityName] = useState<string>('');
  const [activityDate, setActivityDate] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulacija slanja podataka na server, zamijenite ovaj dio stvarnim pozivom funkcije ili API-ja za slanje podataka
      const response = await fetch('https://example.com/add-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: activityName, date: activityDate }),
      });

      if (response.ok) {
        // Ako je odgovor uspješan, možete preusmjeriti korisnika na stranicu popisa aktivnosti
        console.log('Activity added successfully!');
        // Dodajte kod za preusmjeravanje korisnika na odgovarajuću stranicu
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dodaj novu aktivnost</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ime aktivnosti:
          <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
        </label>
        <label>
          Datum aktivnosti:
          <input type="date" value={activityDate} onChange={(e) => setActivityDate(e.target.value)} />
        </label>
        <button type="submit">Dodaj aktivnost</button>
      </form>
    </div>
  );
}

export default AddActivityPage;
