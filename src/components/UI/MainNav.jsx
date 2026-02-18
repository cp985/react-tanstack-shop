//! nav fissa una volta dentro. pensare se mettere
//! filti qui  o creare barra laterale
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import classMainNav from "./style/MainNav.module.css";
import Button from "./Button";
import Input from "./Input";

export default function MainNav({ setIsFilterOpen, isFilterOpen }) {
  const [theme, setTheme] = useState("light");
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const username = localStorage.getItem("username");
  const menuAccountRef = useRef(null);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function toggleAccount() {
    setIsOpenAccount(!isOpenAccount);
  }

useEffect(() => {
    const handleClickFuori = (event) => {
      if (isOpenAccount && menuAccountRef.current && !menuAccountRef.current.contains(event.target)) {
        setIsOpenAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuori);
    
    return () => {
      document.removeEventListener("mousedown", handleClickFuori);
    };
  }, [isOpenAccount]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav
      className={classMainNav.nav}
      style={path === "/app/shop" ? { height: "fit-content" } : {}}
    >
      <ul className={classMainNav.ul1}>
        <li>
          <Button text={"Home"} isLink={true} path={"home"} />
        </li>
        <li className={classMainNav.li}>
          <Button text={"Shop"} isLink={true} path={"shop"} />
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

        <li className={`${classMainNav["account-li"]} `}>
          <Button text={"Account"} onClick={toggleAccount} />
          {isOpenAccount && (
            <div ref={menuAccountRef} className={classMainNav["account-div"]}>
              <Button text={"Profile"} isLink={true} path={`accountUser/${username}/profile`} />
              <Button
                classOf={"secondaryButton"}
                text={theme === "dark" ? "Light" : "Dark"}
                onClick={toggleTheme}
              />
               <Button text={"Logout"} isLink path={`accountUser/${username}/logout`} />
            </div>
          )}
        </li>
      </ul>

      {path === "/app/shop" && (
        <ul className={classMainNav.ul2}>
          <li className={classMainNav["filter-li"]}>
            <Button text={"Filter"} onClick={setIsFilterOpen} />
          </li>
          <li className={classMainNav["search-li"]}>
            <Input type="text" id="search" name="search" label="Search" />
          </li>
        </ul>
      )}
    </nav>
  );
}
