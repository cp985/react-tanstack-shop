import { useState, useEffect } from "react";
import Button from "./Button";
import classSecondNav from "./style/SecondNav.module.css";
export default function SecondNav() {




  return (
    <aside
      className={classSecondNav.secondNav}
    >
 
      <Button text={"Profilo"} isLink path={"profile"} />
      <Button text={"Ordini"} isLink path={"orders"} />
      <Button text={"Logout"} isLink path={"logout"} />
    </aside>
  );
}
