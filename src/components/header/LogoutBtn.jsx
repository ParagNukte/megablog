import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.signOut().then(() => dispatch(logout()));
  };

  return (
    <div>
      <button onClick={logoutHandler}> Logout</button>
    </div>
  );
}

export default LogoutBtn;
