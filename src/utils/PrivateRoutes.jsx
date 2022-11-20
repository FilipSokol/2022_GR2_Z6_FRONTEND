import { Outlet, Navigate } from "react-router-dom";
import NaviMobile from "../components/NaviMobile";
import SideMenu from "../components/SideMenu";
import authService from "../services/auth.service";
import { useResponsive } from "./responsive";

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
      {useResponsive().isMobile && <NaviMobile />}
      {useResponsive().isDesktop && <SideMenu />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
