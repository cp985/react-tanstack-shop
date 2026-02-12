//! nav fissa una volta dentro. pensare se mettere
//! filti qui  o creare barra laterale
import { useState,useEffect } from "react";

import classMainNav from "./style/MainNav.module.css";
import Button from "./Button";


export default function MainNav() {
const [theme,setTheme]=useState('light')

function toggleTheme() {
  setTheme(theme==='dark' ? 'light' : 'dark')
}

useEffect(() => {
  document.body.setAttribute('data-theme', theme);}, [theme]);

  return (
    <nav className={classMainNav.nav}>
      <ul className={classMainNav.ul}>
        <li>
          <Button text={"Home"} isLink={true} path={"home"} />
        </li>
        <li className={classMainNav.li}>
          <Button text={"Shop"} isLink={true} path={"shop"} />
        <div >
        <Button text={"Sales"} isLink={true} path={"sales"} />
        </div>
        </li>
        <li className={`${classMainNav.li} `}>
          <Button text={"Account"}  isLink={true} path={"accountUser/:id"}   />
        <div className={classMainNav['two-link']}>
        <Button text={"Orders"} isLink={true} path={"accountUser/:id/orders"}  />
        <Button text={"Profile"} isLink={true} path={"accountUser/:id/profile"}  />
        </div>
        
        </li>

        <li>
          <Button
            text={"NewsLetterContact"}
            isLink={true}
            path={"newsLetterContact"}
          />
        </li>
        <li>
          <Button text={`Cart(${0})`} isLink={true} path={"cart"} />
        </li>
        <li>
          <Button classOf={'secondaryButton'} text={theme ==='dark' ? 'Light' : 'Dark'}  onClick={toggleTheme} />
        </li>
      </ul>
    </nav>
  );
}
