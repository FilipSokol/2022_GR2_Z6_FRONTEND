import classNames from "classnames";
import styles from "./SvgIcon.module.scss";

export default function SvgIcon(props) {
  const { style, icon } = props;

  return <div className={classNames(style, styles.svgIcon)}>{icon}</div>;
}
