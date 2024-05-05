
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ActivitiesPage from './components/ActivitiesPage';
import VolunteersPage from './components/VolunteersPage';
import OrganizationsPage from './components/OrganizationsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import './styles.css';


 
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
