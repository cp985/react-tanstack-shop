import { NavLink } from "react-router-dom";
import classButton from "./style/Button.module.css";
export default function Button({ text,classOf ,isLink, path,type,  onClick,end,relative,disabled,children }) {
  const getNavLinkClass = ({ isActive }) => {
    return [
      classButton.button,               // Classe base sempre presente
      classOf ? classButton[classOf] : "", // Classe dinamica (es. secondaryButton)
      isActive ? classButton.active : ""   // Classe active se attiva
    ].join(" "); // Unisce tutto in una stringa pulita
  };
  
  
  if (isLink) {
    return <NavLink className={getNavLinkClass} to={path} end={end} relative={relative}>{text}{children}</NavLink>;
  }

  return <button  type={type} className={`${classButton.button} ${classButton[classOf] || ""}`} onClick={onClick} disabled={disabled} >{text}{children}</button>;
}
