import { Link } from "react-router-dom";
import classCardLink from "./style/CardLink.module.css";

export default function CardLink({
  text,
  isLink,
  path,
  type,
  classOf,
  onClick,
}) {
  return (
    <Link className={classCardLink.card} to={path}>
      <img src="#" alt="#" />
      {text}
    </Link>
  );
}
