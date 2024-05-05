import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

const Navbar: React.FC = () => {
  const { isAdminMode, setIsAdminMode } = useContext(UserContext);

  const handleRoleChange = () => {
    setIsAdminMode((prevMode) => !prevMode);
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/activities">Activities</Link></li>
        <li><Link to="/volunteers">Volunteers</Link></li>
        <li><Link to="/organizations">Organizations</Link></li>
        <li>
          <button onClick={handleRoleChange}>{isAdminMode ? 'Switch to User' : 'Switch to Admin'}</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
