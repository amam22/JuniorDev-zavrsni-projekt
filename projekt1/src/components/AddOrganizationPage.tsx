import { useState } from 'react';

const AddOrganizationPage: React.FC = () => {
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationAddress, setOrganizationAddress] = useState<string>('');
  const [organizationCity, setOrganizationCity] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulacija slanja podataka na server, zamijenite ovaj dio stvarnim pozivom funkcije ili API-ja za slanje podataka
      const response = await fetch('https://example.com/add-organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: organizationName, address: organizationAddress, city: organizationCity }),
      });

      if (response.ok) {
        // Ako je odgovor uspješan, možete preusmjeriti korisnika na stranicu popisa volonterskih udruga
        console.log('Organization added successfully!');
        // Dodajte kod za preusmjeravanje korisnika na odgovarajuću stranicu
      } else {
        console.error('Failed to add organization');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add New Organization</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Organization Name:
          <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
        </label>
        <label>
          Organization Address:
          <input type="text" value={organizationAddress} onChange={(e) => setOrganizationAddress(e.target.value)} />
        </label>
        <label>
          Organization City:
          <input type="text" value={organizationCity} onChange={(e) => setOrganizationCity(e.target.value)} />
        </label>
        <button type="submit">Add Organization</button>
      </form>
    </div>
  );
}

export default AddOrganizationPage;
