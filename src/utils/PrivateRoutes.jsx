import { Outlet, Navigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import authService from "../services/auth.service";

const PrivateRoutes = () => {
  const useAuth = () => {
    const token = authService.getCurrentUser();
    const user = authService.parseJwt(token);

    return user && user;
  };

  // TODO  Make user as state and check if he is still logedin every location change
  // useEffect(() => {
  //   AuthVerify();
  // }, [location.pathname]);

  const isAuth = useAuth();

  return isAuth ? (
    <>
      <SideMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
