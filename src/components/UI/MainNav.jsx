//! nav fissa una volta dentro. pensare se mettere
//! filti qui  o creare barra laterale
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useItems } from "../../context/FilteredItemsContext";
import classMainNav from "./style/MainNav.module.css";
import Button from "./Button";
import Input from "./Input";
import { Lightbulb, Moon,Search } from "pixelarticons/react";
export default function MainNav({ setIsFilterOpen }) {
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const path = location.pathname;
  const username = localStorage.getItem("username");
  const { quantityCart, handleSearchChange } = useItems();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

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
          <Button text={"Contact"} isLink={true} path={"newsLetterContact"} />
        </li>
        <li>
          <Button
            text={`Cart(${quantityCart()})`}
            isLink={true}
            path={`${username}/cart`}
          />
        </li>

        <li>
          <Button
            text={"Account"}
            isLink={true}
            path={`accountUser/${username}/profile`}
          />
        </li>
        <li>
          <Button type="button" onClick={toggleTheme} npm install pixelarticons>
            
            {theme === "dark" ? <Moon /> : <Lightbulb />}
          </Button>
        </li>
      </ul>

      {path === "/app/shop" && (
        <ul className={classMainNav.ul2}>
          <li className={classMainNav["filter-li"]}>
            <Button text={"Filter"} onClick={setIsFilterOpen} />
          </li>
          <li className={classMainNav["search-li"]}>
           <div className={classMainNav['search-icon']}>
             <Search />
           </div>
            <Input
              classOfInput={"search"}
              type="text"
              id="search"
              name="search"
              label=""
              onChange={handleSearchChange}
              placeholder={"Search"}
            />
          </li>
        </ul>
      )}
    </nav>
  );
}
