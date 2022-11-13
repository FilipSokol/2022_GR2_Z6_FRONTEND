import { Outlet, Navigate } from "react-router-dom";
import NaviMobile from "../components/NaviMobile";
import SideMenu from "../components/SideMenu";
import { useResponsive } from "./responsive";

const PrivateRoutes = (data) => {
  const { token } = data;

  return token ? (
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
