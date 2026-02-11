import { Link } from "react-router-dom";
import classCardLink from "./style/CardLink.module.css";

export default function CardLink({
  text,

  width,
  path,

}) {
  return (
    <Link style={{width}} className={classCardLink.card} to={path}>
      <img src="#" alt="#" />
      {text}
    </Link>
  );
}
