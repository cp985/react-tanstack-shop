import { NavLink } from "react-router-dom";
import classButton from "./style/Button.module.css";
export default function Button({
  text,
  classOf,
  isLink,
  path,
  type,
  onClick,
  end,
  relative,
  disabled,
  children,
}) {
  const getNavLinkClass = ({ isActive }) => {
    return [
      classButton.button,
      classOf ? classButton[classOf] : "",
      isActive ? classButton.active : "",
    ].join(" ");
  };

  if (isLink) {
    return (
      <NavLink
        className={getNavLinkClass}
        to={path}
        end={end}
        relative={relative}
      >
        {text}
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      className={`${classButton.button} ${classOf 
    ? classOf.split(" ").map(c => classButton[c] || "").join(" ") 
    : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
}
