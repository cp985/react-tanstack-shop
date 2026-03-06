import { useImmer } from "use-immer";
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
import {
  addressReg,
  capReg,
  emailReg,
  phoneReg,
  textReg,
  ccReg,
} from "../../util/auth";

const ModalCheckout = forwardRef(function ModalCheckout(
  { children, closeModal },
  ref,
) {
  const { clearCart, cart, totalPrice } = useItems();
  const navigate = useNavigate();
  const [errorsList, setErrorsList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cc, setCC] = useState("");
  const user = localStorage.getItem("username");
  const [indirizzoSpedizione, setIndirizzoSpedizione] = useImmer({
    nome: "",
    cognome: "",
    telefono: "",
    via: "",
    citta: "",
    cap: "",
    paese: "",
  });

  const {
    data: userData,
    isLoading: isLoadingData,
    isError: isErrorData,
    error: isErrorM,
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

  const { mutate, isPending , isError, error} = useMutation({
    mutationFn: (order) => postOrders(order),
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        closeModal();
        navigate(`accountUser/${user}/orders`);
      }, 4000);
    },
  });

  function handleCheckout(e) {
    e.preventDefault();

    let currentErrors = [];

    if (!textReg(indirizzoSpedizione.nome))
      currentErrors.push("Il Nome non è valido.");
    if (!textReg(indirizzoSpedizione.cognome))
      currentErrors.push("Il Cognome non è valido.");
    if (!phoneReg(indirizzoSpedizione.telefono))
      currentErrors.push("Il numero di Telefono non è valido.");
    if (!addressReg(indirizzoSpedizione.via))
      currentErrors.push("L'Indirizzo (Via) non è valido.");
    if (!addressReg(indirizzoSpedizione.citta))
      currentErrors.push("La Città non è valida.");
    if (!capReg(indirizzoSpedizione.cap))
      currentErrors.push("Il CAP deve essere di 5 cifre.");
    if (!addressReg(indirizzoSpedizione.paese))
      currentErrors.push("Il Paese non è valido.");

    if (!ccReg(cc)) {
      currentErrors.push(
        "Il numero della Carta di Credito deve avere tra 13 e 16 cifre.",
      );
    }

    if (currentErrors.length > 0) {
      setErrorsList(currentErrors);
      return;
    }

    setErrorsList([]);
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
        draft.telefono = userData.user.telefono || "";
        draft.via = userData.user.indirizzo?.via || "";
        draft.citta = userData.user.indirizzo?.citta || "";
        draft.cap = userData.user.indirizzo?.cap || "";
        draft.paese = userData.user.indirizzo?.paese || "Italia";
      });
    }
  }, [userData]);

  if (isSuccess)
    return (
      <Modal ref={ref}>
        <div className={classModalCheckout["success-container"]}>
          <h3>Il tuo acquisto è stato effettuato con successo</h3>
          <p>Verrai reindirizzato a breve alla pagina dei tuoi ordini</p>
        </div>
      </Modal>
    );

  return (
    <Modal ref={ref}>
      <h2 className={classModalCheckout["title"]}>
        Compila tutti i campi per la spedizione
      </h2>
      {errorsList.length > 0 && (
        <ul className={classModalCheckout["errors-list"]}>
          {errorsList.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {isErrorData && <p className={classModalCheckout["errors-list"]}>{isErrorM.message}</p>}
      {isError && <p className={classModalCheckout["errors-list"]}>{error.message}</p>}
      <form className={classModalCheckout["modal-checkout"]}>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="cognome"
            name="cognome"
            label="Cognome"
            defaultValue={userData?.user?.cognome}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="nome"
            name="nome"
            label="Nome"
            defaultValue={userData?.user?.nome}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="telefono"
            name="telefono"
            label="Telefono"
            defaultValue={userData?.user?.telefono}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="via"
            name="via"
            label="Via"
            defaultValue={userData?.user?.indirizzo?.via}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="citta"
            name="citta"
            label="Citta"
            defaultValue={userData?.user?.indirizzo?.citta}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="cap"
            name="cap"
            label="Cap"
            defaultValue={userData?.user?.indirizzo?.cap}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classModalCheckout["input-container"]}>
          <Input
            type="text"
            id="paese"
            name="paese"
            label="Paese"
            defaultValue={userData?.user?.indirizzo?.paese || "Italia"}
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
              placeholder="Numero C.C."
              onChange={(e) => onChangeCC(e)}
            />
          </div>
          <div className={classModalCheckout["buttons-container"]}>
            <Button
              type="button"
              disabled={isPending}
              onClick={closeModal}
              text="Indietro"
            />
            <Button
              type="button"
              text="Paga"
              disabled={isPending || cart.length === 0 || totalPrice() === 0}
              onClick={handleCheckout}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
});

export default ModalCheckout;
