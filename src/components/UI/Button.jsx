import { NavLink } from "react-router-dom";
import classButton from "./style/Button.module.css";
export default function Button({ text,classOf ,isLink, path,type,  onClick,end,relative,disabled }) {
  if (isLink) {
    return <NavLink className={({isActive})=> `${isActive ? classButton.active : classButton.button} ${classButton[classOf] || ""}`} to={path} end={end} relative={relative}>{text}</NavLink>;
  }

  return <button  type={type} className={`${classButton.button} ${classButton[classOf] || ""}`} onClick={onClick} disabled={disabled} >{text}</button>;
}
