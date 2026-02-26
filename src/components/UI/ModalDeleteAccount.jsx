import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../util/httpRequest";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useItems } from "../../context/FilteredItemsContext";
import classModalDelete from './style/ModalDeleteAccount.module.css'
const ModalDeleteAccount = forwardRef(function ModalDeleteAccount(
  { children },
  ref,
) {
  const { closeModalDeleteAccount } = useItems();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: (password) => deleteAccount(password),
    onSuccess: () => {
      localStorage.clear();
      closeModalDeleteAccount();
      navigate("/", {
        replace: true,
        state: {
          message:
            "Il tuo account è stato eliminato correttamente. Ci mancherai! 😢",
        },
      });
    },
  });

  function deleteAcc() {
    mutate(password);
  }

  return (
    <Modal ref={ref}>
      <h2>Sei sicuro di voler cancellare il tuo account?</h2>
      <p className={classModalDelete["text"]}>Inserisci la tua password per confermare</p>
      {isError && <p>{error.message}</p>}
      <div className={classModalDelete["input-container"]}>
        <Input
          type="password"
          id="password"
          name="password"
          label=""
          placeholder="Password"
          onChange={onChangePassword}
        />
        <div className={classModalDelete["button-container"]}>
          <Button
            type="button"
            onClick={closeModalDeleteAccount}
            text="Indietro"
          />
          <Button
            type="button"
            text="Conferma"
            disabled={isPending || password === ""}
            onClick={() => deleteAcc(password)}
          />
        </div>
      </div>
    </Modal>
  );
});

export default ModalDeleteAccount;
