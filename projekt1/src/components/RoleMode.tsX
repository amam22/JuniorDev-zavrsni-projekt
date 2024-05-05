import { useContext } from "react";
import Switch from "@mui/material/Switch";
import { GrUserAdmin } from "react-icons/gr";
import UserContext from "../../context/UserContext";
import  "../styles/RoleMode.module.css"; // Provjerite da li je ispravno uvezen stil

const RoleMode = () => {
  const { isAdminMode, setIsAdminMode } = useContext(UserContext);

  const handleChange = () => {
    setIsAdminMode((prevMode) => !prevMode); // Invertiranje trenutnog moda
  };

  return (
    <div className={styles.RoleModeContainer}> {/* Provjerite ispravno korištenje stila */}
      <Switch
        checked={isAdminMode}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <div className={styles.Icon}> {/* Provjerite ispravno korištenje stila */}
        <GrUserAdmin
          size={20}
          color={isAdminMode ? "#0d47a1" : "gray"}
        />
      </div>
    </div>
  );
};

export default RoleMode;
