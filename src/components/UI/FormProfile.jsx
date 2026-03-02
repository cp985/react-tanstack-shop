import { useMutation, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useItems } from "../../context/FilteredItemsContext";
import { updateUser } from "../../util/httpRequest";
const API_URL = import.meta.env.VITE_API_URL;
import { phoneReg,addressReg, capReg, emailReg, passwordReg, textReg } from "../../util/auth";
import classFormProfile from "./style/FormProfile.module.css";

export default function FormProfile() {
  const { setUser } = useItems();

  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.json();
    },
  });

  const [errorForm, setErrorForm] = useState([]); // ✅ dentro il componente

  const { data, isLoading, isError, mutate, error } = useMutation({
    mutationFn: (user) => updateUser(user),
    onSuccess: (response) => {
      setErrorForm([]);
      setUser(produce((draft) => {
        draft.username = response.user.username;
        draft.email = response.user.email;
        draft.isLogIn = true;
      }));
      localStorage.setItem("expires", Date.now() + 10 * 60 * 1000);
      localStorage.setItem("username", response.user.username);
      localStorage.setItem("email", response.user.email);
    },
  });

  function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const errors = [];

    if (formData.get("password") !== formData.get("passwordConfirm")) {
      errors.push("Le password non corrispondono");
    }

    const user = {
      nome: formData.get("name"),
      cognome: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      telefono: formData.get("phone"),
      indirizzo: {
        via: formData.get("address"),
        cap: formData.get("cap"),
        citta: formData.get("city"),
      },
    };

    if (!textReg(user.nome)) errors.push("Nome non valido (solo lettere, 2-50 caratteri)");
    if (!textReg(user.cognome)) errors.push("Cognome non valido (solo lettere, 2-50 caratteri)");
    if (!emailReg(user.email)) errors.push("Email non valida");
    if (!passwordReg(user.password)) errors.push("Password non valida (min 8 caratteri, maiuscola, numero e simbolo)");
    if (!addressReg(user.indirizzo.via)) errors.push("Indirizzo non valido");
    if (!capReg(user.indirizzo.cap)) errors.push("CAP non valido (5 cifre)");
    if (!textReg(user.indirizzo.citta)) errors.push("Città non valida");
    if (!phoneReg(user.telefono)) errors.push("Telefono errato");

    setErrorForm(errors);
    if (errors.length > 0) return;

    mutate(user);
  }

  return ( 
    <form onSubmit={submitHandler} className={classFormProfile.form}>
      {errorForm.length > 0 && (
        <ul className={classFormProfile["error-list"]}>
          {errorForm.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {isError && <h3 className={classFormProfile["error"]}>{error.message}</h3>}
      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="name" name="name" label="Name" placeholder="Name" defaultValue={queryData?.user?.nome} />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="lastname" name="lastname" label="Cognome" placeholder="Cognome" defaultValue={queryData?.user?.cognome} />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="email" id="email" name="email" label="Email" placeholder="Email" defaultValue={queryData?.user?.email} />
        </div>
      </div>
      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input type="password" id="password" name="password" label="Password" placeholder="Password" />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="password" id="passwordConfirm" name="passwordConfirm" label="Password Confirm" placeholder="Password Confirm" />
        </div>
      </div>
      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="address" name="address" label="Indirizzo" placeholder="Address" defaultValue={queryData?.user?.indirizzo?.via} />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="cap" name="cap" label="Cap" placeholder="Cap" defaultValue={queryData?.user?.indirizzo?.cap} />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="city" name="city" label="Citta" placeholder="City" defaultValue={queryData?.user?.indirizzo?.citta} />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input type="text" id="phone" name="phone" label="Telefono" placeholder="Telefono" defaultValue={queryData?.user?.telefono} />
        </div>
      </div>
      <div>
        {data?.message ? (
          <h3 className={classFormProfile["success"]}>{data.message}</h3>
        ) : (
          <p>Vuoi salvare i tuoi dati?</p>
        )}
        <Button disabled={isLoading} type="submit" text="Salva" />
      </div>
    </form>
  );
}