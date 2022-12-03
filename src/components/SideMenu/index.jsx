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
import { useNavigate } from "react-router-dom";

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
              linkText={useResponsive().isSmallDesktop ? "" : "Oceny"}
              mobile={false}
            />
            <LinkMenu
              icon={calendar}
              link={"/plan"}
              linkText={useResponsive().isSmallDesktop ? "" : "Plan zajęć"}
              mobile={false}
            />
            <LinkMenu
              icon={logOut}
              linkText={useResponsive().isSmallDesktop ? "" : "Wyloguj"}
              mobile={false}
              link={"/login"}
              logOut={true}
            />
          </div>
        );
      case "Teacher":
        console.log("Teacher");
        break;
      case "Admin":
        return (
          <div className={styles.part}>
            <LinkMenu
              icon={tool}
              link={"/"}
              linkText={useResponsive().isSmallDesktop ? "" : "Panel admina"}
              mobile={false}
            />
            <LinkMenu
              icon={logOut}
              linkText={useResponsive().isSmallDesktop ? "" : "Wyloguj"}
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

            {useAuthMenu()}
          </div>
        </div>
      )}
    </div>
  );
}
