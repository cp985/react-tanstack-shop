import { useImmer } from "use-immer";
import { createPortal } from "react-dom";
import { forwardRef, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import { useNavigate, useParams } from "react-router-dom";
import { useMutation,useQuery } from "@tanstack/react-query";
import { postOrders } from "../../util/httpRequest";
import Button from "./Button";
import Input from "./Input";
import classModalCheckout from "./style/ModalCheckout.module.css";
import { useItems } from "../../context/FilteredItemsContext";
import Modal from "./Modal";

const ModalCheckout = forwardRef(function ModalCheckout(
  { children, closeModal },
  ref,
) {
  const { clearCart, cart, totalPrice } = useItems();
  const navigate = useNavigate();
  const user = localStorage.getItem("username");

  const [indirizzoSpedizione, setIndirizzoSpedizione] = useImmer({
    name: "",
    cognome: "",
    via: "",
    citta: "",
    cap: "",
    paese: "",
  });
  const order = {
    prodotti: cart.map((item) => ({
      prodottoId: item._id,
      quantita: item.quantity,
    })),
    indirizzoSpedizione,
    metodoPagamento: `carta`,
    pagato: true,
  };

  const {
    data: userData,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.json();
    },
  });



  const { mutate } = useMutation({
    mutationFn: (order) => postOrders(order),
    onSuccess: () => {
      clearCart();
      closeModal();
      navigate(`accountUser/${user}/orders`);
    },
  });
  function handleCheckout(e) {
const formData = new FormData(e.target);
    setIndirizzoSpedizione((draft) => {
      draft.name = formData.get("name");
      draft.cognome = formData.get("lastname");
      draft.via = formData.get("address");
      draft.citta = formData.get("city");
      draft.cap = formData.get("cap");
      draft.paese = formData.get("country");
    });
    console.log("paga");
    console.log('order ',order);
    
    // mutate(order);
  }

  return (
    <Modal ref={ref}>
      <h2>Modal</h2>
      <form
        className={classModalCheckout["modal-checkout"]}
        
      >
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="cognome" name="cognome" label="Cognome" defaultValue={userData?.user?.nome}/>
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="nome" name="nome" label="Nome" defaultValue={userData?.user?.cognome} />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="via" name="via" label="Via"  defaultValue={userData?.user?.via} />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="citta" name="citta" label="Citta" defaultValue={userData?.user?.citta} />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="cap" name="cap" label="Cap" defaultValue={userData?.user?.cap} />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input type="text" id="paese" name="paese" label="Paese" defaultValue={userData?.user?.paese} />
        </div>

        <div className={classModalCheckout["button-container"]}>
          <div className={classModalCheckout["cc-container"]}>
            <Input
              type="text"
              id="cartaDiCredito"
              name="cartaDiCredito"
              label="Carta Di Credito"
              placeholder="Carta Di Credito"
            />
          </div>

          <Button type="button" onClick={closeModal} text="Indietro" />
          <Button
            disabled={cart.length === 0 || totalPrice() === 0}
            type="button"
            text="Paga"
            onClick={() => handleCheckout(order)}
          />
        </div>
      </form>
    </Modal>
  );
});

export default ModalCheckout;
