import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import smallLogo from "../../assets/smallLogo";
import logOut from "../../assets/logOut";
import { useResponsive } from "../../utils/responsive";
import LinkMenu from "../LinkMenu";
import SvgIcon from "../SvgIcon";
import styles from "./SideMenu.module.scss";
import authService from "../../services/auth.service";
import calendar from "../../assets/calendar";
import student from "../../assets/student";
import mediumLogo from "../../assets/mediumLogo";

export default function SideMenu() {
  // const [currentUser, setCurrentUser] = useState(null);

  // const AuthVerify = () => {
  //   const user = authService.getCurrentUser();
  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // };

  // useEffect(() => {
  //   AuthVerify();
  // }, [location.pathname]);

  return (
    <div>
      {useResponsive().isDesktop && (
        <div className={styles.sideMenuContainer}>
          <div className={styles.content}>
            <div className={styles.logo}>
              <Link to="/">
                {useResponsive().isSmallDesktop ? (
                  <SvgIcon icon={smallLogo} />
                ) : (
                  <SvgIcon icon={mediumLogo} />
                )}
              </Link>
            </div>

            <div className={styles.part}>
              <LinkMenu
                icon={student}
                link={"/oceny"}
                linkText={useResponsive().isSmallDesktop ? "" : "Oceny"}
                mobile={false}
              />
              <LinkMenu
                icon={calendar}
                link={"/plan"}
                linkText={useResponsive().isSmallDesktop ? "" : "Plan zajęć"}
                mobile={false}
              />
              {/* //TODO logout, change LinkMenu component structure */}
              <LinkMenu
                icon={logOut}
                linkText={useResponsive().isSmallDesktop ? "" : "Wyloguj"}
                mobile={false}
                link={"/login"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
