import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Organization } from '../types';
import '../styles/OrganizationPage.css';

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [sortedBy, setSortedBy] = useState<'name' | 'address' | 'city' | null>(null);
  const [isAddingOrganization, setIsAddingOrganization] = useState<boolean>(false);

  useEffect(() => {
    const sampleOrganizations: Organization[] = [
      { id: 1, name: 'UDRUGA ZA DJECU BEZ RODITELJSKE SKRBI LASTAVICE', address: 'Mosećka ul. 70', city: 'Split' },
      { id: 2, name: 'Udruga Anđeli', address: 'Šibenska ul. 33', city: 'Split' },
      { id: 3, name: 'Udruga "DUGA"', address: 'Ul. kralja Zvonimira 75', city: 'Solin' },
    ];
    setOrganizations(sampleOrganizations);
  }, []);

  const handleSort = (sortBy: 'name' | 'address' | 'city') => {
    const sortedOrganizations = [...organizations].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
    setSortedBy(sortBy);
    setOrganizations(sortedOrganizations);
  };

  const handleRequestNewOrganization = () => {
    setIsAddingOrganization(true);
    // Dodajte kôd za prikaz forme za unos nove udruge
  };

  return (
    <div className="organizations-container">
      <h1 className="organizations-title">Organizacije</h1>
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('address')}>Sort by Address</button>
      <button onClick={() => handleSort('city')}>Sort by City</button>
      {isAddingOrganization ? (
        <AddOrganizationForm />
      ) : (
        <button onClick={handleRequestNewOrganization}>Request New Organization</button>
      )}
      <ul className="organizations-list">
        {organizations.map(organization => (
          <li key={organization.id}>
            <Link to={`/organizations/${organization.id}`}>{organization.name}</Link>
            <span>{organization.address}, {organization.city}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddOrganizationForm: React.FC = () => {
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationAddress, setOrganizationAddress] = useState<string>('');
  const [organizationCity, setOrganizationCity] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dodajte logiku za slanje zahtjeva za dodavanje nove udruge
  };

  return (
    <div>
      <h2>Add New Organization</h2>
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
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default OrganizationsPage;
