import { Link, useLocation } from "react-router-dom";
import styles from "./NaviMobile.module.scss";
import SvgIcon from "../SvgIcon";

import LinkMenu from "../LinkMenu";
import smallLogo from "../../assets/smallLogo";

export default function NaviMobile() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.sideMenuContainer}>
        <div className={styles.content}>
          <li onClick={() => onChangeMobileVisibility(!visibleMobile)}>
            <div className={styles.logo}>
              <Link to="/">
                <SvgIcon icon={smallLogo} />
              </Link>
            </div>
          </li>
          <div className={styles.part}>
            <LinkMenu
              icon={smallLogo}
              link={"/domeny"}
              linkText={"Domeny"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/serwery"}
              linkText={"Serwery"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/certyfikaty"}
              linkText={"Certyfikaty SSL"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/protectpc"}
              linkText={"Protect PC"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/insert"}
              linkText={"Insert"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/xopero"}
              linkText={"Xopero"}
              mobile={true}
            />
            <LinkMenu
              icon={smallLogo}
              link={"/innelicencje"}
              linkText={"Inne licencje"}
              mobile={true}
            />
            <Link to="/bazaklientow">
              <li
                onClick={() => onChangeMobileVisibility(!visibleMobile)}
                className={
                  location.pathname.startsWith("/bazaklientow") ||
                  location.pathname === "/"
                    ? styles.background
                    : ""
                }
              >
                <SvgIcon icon={smallLogo}></SvgIcon>
                <div
                  className={
                    location.pathname.startsWith("/bazaklientow")
                      ? styles.chosenItem
                      : ""
                  }
                >
                  Baza Klientów
                </div>
              </li>
            </Link>
            <LinkMenu
              icon={smallLogo}
              link={"/cennik"}
              linkText={"Cennik"}
              mobile={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
