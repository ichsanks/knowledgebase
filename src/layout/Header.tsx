import { FaPowerOff } from "react-icons/fa";
import { logout, useAuthDispatch, useAuthState } from "store";
import { Button } from "components";

export default function Header() {
  const dispatch = useAuthDispatch();
  const { userinfo } = useAuthState();
  const { profile } = userinfo;
  const { name, position_description } = profile;

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <div id="header">
      <div id="user-menu">
        <div className="userinfo">
          <p>{name}</p>
          <p>{position_description}</p>
        </div>
        <Button
          variant="transparent"
          aria-label="Logout"
          onClick={handleLogout}
        >
          <FaPowerOff />
        </Button>
      </div>
    </div>
  );
}
