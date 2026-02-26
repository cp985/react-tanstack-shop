//! visualizza carrello corrente
import { useItems } from "../context/FilteredItemsContext";
import Button from "../components/UI/Button";

import classCart from "./style/Cart.module.css";
import {Plus,Minus} from 'pixelarticons/react'
export default function Cart() {
  const { cart, removeCart, addCart, clearCart, totalPrice, openModal } =
    useItems();
  return (
    <section className={classCart["cart-page"]}>
      <h2>Carrello</h2>
      {cart.length === 0 && <h3>Carrello vuoto</h3>}
      <div className={classCart["cart-container"]}>
        <ul className={classCart["cart-list"]}>
          {cart.map((item) => (
            <li className={classCart["cart-item"]} key={item.id}>
              <p>{item.nome} </p>
              
              <div className={classCart["quantity-container"]}>
                <p>Prezzo Cad. {item.prezzo}</p>
                <Button onClick={() => removeCart(item.id)} ><Minus/></Button>
                {item.quantity}
                <Button onClick={() => addCart(item)} ><Plus/></Button >
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classCart["cart-total"]}>
        <Button onClick={clearCart} text="Clear Cart" />
        <div className={classCart["checkout-container"]}>
          <Button
            disabled={cart.length === 0 || totalPrice() === 0}
            text="Checkout"
            onClick={openModal}
          />
          <p>Totale:{`${totalPrice()}`}</p>
        </div>
      </div>
    </section>
  );
}
