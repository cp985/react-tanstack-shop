import { createPortal } from "react-dom";
import { forwardRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postOrders } from "../../util/httpRequest";
import Button from "./Button";
import Input from "./Input";
import classModal from "./style/Modal.module.css";
import { useItems } from "../../context/FilteredItemsContext";
import Modal from "./Modal";

const ModalCheckout =forwardRef(function ModalCheckout({children, closeModal }, ref) {
  const { clearCart, cart, totalPrice } = useItems();
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const [cc, setCc] = useState("");
  const order = {
    prodotti: cart.map((item) => ({
      prodottoId: item._id,
      quantita: item.quantity,
    })),
    indirizzoSpedizione: {
      nome: "...",
      cognome: "...",
      via: "...",
      citta: "...",
      cap: "...",
      paese: "..",
    },
    metodoPagamento: `carta`,
  };

  const { mutate } = useMutation({
    mutationFn: (order) => postOrders(order),
    onSuccess: () => {
      clearCart();
      closeModal();
      navigate(`accountUser/${user}/orders`);
    },
  });
  function handleCheckout(order) {
    console.log("paga");
    mutate(order);
  }

  return (
    <Modal className={classModal.dialog} ref={ref}>
      <form>
        <h2>Modal</h2>
        <Input
          type="text"
          id="cartaDiCredito"
          name="cartaDiCredito"
          label="Carta Di Credito"
          placeholder="Carta Di Credito"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
        />

        <div className={classModal["button-container"]}>
          <Button type="button" onClick={closeModal} text="Indietro" />
          <Button
            disabled={cart.length === 0 || totalPrice() === 0}
            type="button"
            onClick={() => handleCheckout(order)}
            text="Paga"
          />
        </div>
      </form>
    </Modal>

  );
})


export default ModalCheckout

