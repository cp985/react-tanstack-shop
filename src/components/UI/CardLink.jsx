import { Link } from "react-router-dom";
import classCardLink from "./style/CardLink.module.css";

export default function CardLink({
  title,
  description,
  path,
  classImage,
  classOf,
  children,
  image
}) {
  return (
    <Link
      className={`${classCardLink.card} ${classCardLink[classOf] || ""}`}
      to={path}
    >
      <h2>{title}</h2>
      {image && (
        <div
          className={`${classCardLink.image} ${classCardLink[classImage] || ""}`}
        >
       
          {children}
        </div>
      )}{" "}
      {description && <p>{description}</p>}
    </Link>
  );
}
