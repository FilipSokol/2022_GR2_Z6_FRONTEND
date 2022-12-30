import { Link } from "react-router-dom";
import smallLogo from "../../assets/smallLogo";
import logOut from "../../assets/logOut";
import { useResponsive } from "../../utils/responsive";
import LinkMenu from "../LinkMenu";
import SvgIcon from "../SvgIcon";
import styles from "./SideMenu.module.scss";
import calendar from "../../assets/calendar";
import student from "../../assets/student";
import mediumLogo from "../../assets/mediumLogo";
import tool from "../../assets/tool";
import authService from "../../services/auth.service";

export default function SideMenu() {
  const token = authService.getCurrentUser();
  const user = authService.parseJwt(token);
  const role =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const useAuthMenu = () => {
    switch (role) {
      case "Student":
        return (
          <div className={styles.part}>
            <LinkMenu
              icon={student}
              link={"/oceny"}
              secondLink={"/"}
              linkText={useResponsive().isSmallDesktop ? "" : "Grades"}
              mobile={false}
            />
            <LinkMenu
              icon={calendar}
              link={"/plan"}
              linkText={useResponsive().isSmallDesktop ? "" : "Schedule"}
              mobile={false}
            />
            <LinkMenu
              icon={logOut}
              linkText={useResponsive().isSmallDesktop ? "" : "Log out"}
              mobile={false}
              link={"/login"}
              logOut={true}
            />
          </div>
        );
      case "Teacher":
        return (
          <div className={styles.part}>
            <LinkMenu
              icon={student}
              link={"/oceny"}
              secondLink={"/"}
              linkText={useResponsive().isSmallDesktop ? "" : "Grades"}
              mobile={false}
            />
            <LinkMenu
              icon={calendar}
              link={"/plan"}
              linkText={useResponsive().isSmallDesktop ? "" : "Schedule"}
              mobile={false}
            />
            <LinkMenu
              icon={logOut}
              linkText={useResponsive().isSmallDesktop ? "" : "Log out"}
              mobile={false}
              link={"/login"}
              logOut={true}
            />
          </div>
        );
      case "Admin":
        return (
          <div className={styles.part}>
            <LinkMenu
              icon={tool}
              link={"/"}
              secondLink={"/"}
              linkText={useResponsive().isSmallDesktop ? "" : "Admin panel"}
              mobile={false}
            />
            <LinkMenu
              icon={logOut}
              linkText={useResponsive().isSmallDesktop ? "" : "Log out"}
              mobile={false}
              link={"/login"}
              logOut={true}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
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

          {useAuthMenu()}
        </div>
      </div>
    </div>
  );
}
