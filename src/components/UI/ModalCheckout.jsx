import { useImmer } from "use-immer";
import { createPortal } from "react-dom";
import { forwardRef, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [error, setError] = useState(null);
  const [cc, setCC] = useState("");
  const user = localStorage.getItem("username");
  const [indirizzoSpedizione, setIndirizzoSpedizione] = useImmer({
    nome: "",
    cognome: "",
    via: "",
    citta: "",
    cap: "",
    paese: "",
  });

  const {
    data: userData,
    isLoading: isLoadingData,
    isError: isErrorData,
    error:isErrorM,
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

  const { mutate, isPending } = useMutation({
    mutationFn: (order) => postOrders(order),
    onSuccess: () => {
      clearCart();
      closeModal();
      navigate(`accountUser/${user}/orders`);
    },
  });
  function handleCheckout(e) {
    if (
      !indirizzoSpedizione.nome ||
      !indirizzoSpedizione.cognome ||
      !indirizzoSpedizione.via ||
      !indirizzoSpedizione.citta ||
      !indirizzoSpedizione.cap ||
      !indirizzoSpedizione.paese
    ) {
      setError("Compila tutti i campi dell'indirizzo");
      return;
    }
    if (cc === "") {
      setError("Inserisci la carta di credito");
      return;
    }

    setError(null);
    const order = {
      prodotti: cart.map((item) => ({
        prodottoId: item._id,
        quantita: item.quantity,
      })),
      indirizzoSpedizione,
      metodoPagamento: `carta`,
      pagato: true,
    };


    mutate(order);
  }

  function onChange(e) {
    setIndirizzoSpedizione((draft) => {
      draft[e.target.name] = e.target.value;
    });
  }
  function onChangeCC(e) {
    setCC(e.target.value);
  }
  useEffect(() => {
    if (userData?.user) {
      setIndirizzoSpedizione((draft) => {
        draft.nome = userData.user.nome || "";
        draft.cognome = userData.user.cognome || "";
        draft.via = userData.user.indirizzo?.via || "";
        draft.citta = userData.user.indirizzo?.citta || "";
        draft.cap = userData.user.indirizzo?.cap || "";
        draft.paese = userData.user.indirizzo?.paese || "Italia";
      });
    }
  }, [userData]);

  return (
    <Modal ref={ref}>
      <h2 className={classModalCheckout['title']}>Compila i campi per la spedizione</h2>
      {error &&<h3>{error}</h3>}
      {isErrorData && <h3>{isErrorM.message}</h3>}
      <form className={classModalCheckout["modal-checkout"]}>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="cognome"
            name="cognome"
            label="Cognome"
            defaultValue={userData?.user?.nome}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="nome"
            name="nome"
            label="Nome"
            defaultValue={userData?.user?.cognome}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="via"
            name="via"
            label="Via"
            defaultValue={userData?.user?.indirizzo.via}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="citta"
            name="citta"
            label="Citta"
            defaultValue={userData?.user?.indirizzo.citta}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="cap"
            name="cap"
            label="Cap"
            defaultValue={userData?.user?.indirizzo.cap}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="paese"
            name="paese"
            label="Paese"
            defaultValue={userData?.user?.indirizzo.paese || "Italia"}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className={classModalCheckout["button-container"]}>
          <div className={classModalCheckout["cc-container"]}>
            <Input
              type="text"
              id="cartaDiCredito"
              name="cartaDiCredito"
              label="Carta Di Credito"
              placeholder="Carta Di Credito"
              onChange={(e) => onChangeCC(e)}
            />
          </div>
<div className={classModalCheckout["button-container"]}>


            <Button type="button" onClick={closeModal} text="Indietro" />
          <Button
            type="button"
            text="Paga"
            disabled={
              isPending ||
              cart.length === 0 ||
              totalPrice() === 0 ||
              cc === "" ||
              !indirizzoSpedizione.nome ||
              !indirizzoSpedizione.cognome ||
              !indirizzoSpedizione.via ||
              !indirizzoSpedizione.citta ||
              !indirizzoSpedizione.cap ||
              !indirizzoSpedizione.paese
            }
            onClick={handleCheckout}
          />
</div>

        </div>
      </form>
    </Modal>
  );
});

export default ModalCheckout;
