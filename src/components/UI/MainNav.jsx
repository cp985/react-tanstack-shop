//! nav fissa una volta dentro. pensare se mettere
//! filti qui  o creare barra laterale
import classMainNav from "./style/MainNav.module.css";
import Button from "./Button";
export default function MainNav() {
  return (
      <nav className={classMainNav.nav} >
        <ul className={classMainNav.ul}>
                   <li>
            <Button text={"Home"} isLink={true} path={"home"} />
          </li>
          <li>
            <Button text={"Shop"} isLink={true} path={"shop"} />
          </li>
          <li>
            <Button text={"Account"} isLink={true} path={"accountUser/:id"} />
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
        </ul>
      </nav>
  
  );
}
