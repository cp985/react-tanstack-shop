import { NavLink } from "react-router-dom";
import classButton from "./style/Button.module.css";
export default function Button({ text, isLink, path,type ,classOf, onClick }) {
  if (isLink) {
    return <NavLink className={({isActive})=> isActive ? classButton.active : classButton.button} to={path}>{text}</NavLink>;
  }

  return <button type={type} className={classOf ? classOf : classButton.button} onClick={onClick}>{text}</button>;
}
