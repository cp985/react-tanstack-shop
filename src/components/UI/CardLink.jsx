import { Link } from "react-router-dom";
import classCardLink from "./style/CardLink.module.css";

export default function CardLink({
  title,
description,
  path,
  classImage,
  classOf,
  children,
  

}) {
  return (
    <Link  className={`${classCardLink.card} ${classCardLink[classOf] || ""}`} to={path}>
     <h2>{title}</h2>
      <div  className={`${classCardLink.image} ${classCardLink[classImage] || ""}`} ></div>
      <p>{description}</p>
      {children}
      
    </Link>
  );
}
