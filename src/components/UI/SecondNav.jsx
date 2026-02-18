import { useState, useEffect } from "react";
import Button from "./Button";
import classSecondNav from "./style/SecondNav.module.css";
export default function SecondNav() {
  //!sbloccare per  margin-top dinamico

  //     const [marginTop, setMarginTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const altezzaNavbar = -30;

  //     const nuovoMargine = Math.max(50, altezzaNavbar - scrollY);

  //     setMarginTop(nuovoMargine);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <aside
      className={classSecondNav.secondNav}
      // style={{ marginTop: `${marginTop}px` }}
    >
      <h4>SecondNav</h4>
      <Button text={"Profilo"} isLink path={"profile"} />
      <Button text={"Ordini"} isLink path={"orders"} />
      <Button text={"Logout"} isLink path={"logout"} />
    </aside>
  );
}
