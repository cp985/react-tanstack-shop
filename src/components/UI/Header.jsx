import classHeader from "./style/Header.module.css";
import logo from "../../assets/favicon-96x96.png";


export default function Header() {
  return (
    <header className={classHeader.header}>
      <div className={classHeader["logo-animazione-container"]}>
    
    <div className={classHeader["moneta-rotolante"]}>
      <img src={logo} alt="logo" />
    </div>
    
    <div className={classHeader["titolo-contenitore"]}>
      <h1 className={classHeader["reveal-title"]}>
      The Golden Pixel Inn
      </h1>
    </div>
    
  </div>
    </header>
  );
}
