import { useMutation, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useItems } from "../../context/FilteredItemsContext";
import { updateUser } from "../../util/httpRequest";
const API_URL = import.meta.env.VITE_API_URL;

import classFormProfile from "./style/FormProfile.module.css";

export default function FormProfile() {
  const { setUser } = useItems();
  const {
    data: queryData,
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

  const [errorForm, setErrorForm] = useState(undefined);
  const { data, isLoading, isError, onSuccess, mutate } = useMutation({
    mutationFn: (user) => updateUser(user),
    onSuccess: (response) => {
      setErrorForm(undefined);
      setUser(
        produce((draft) => {
          draft.username = response.user.username;
          draft.email = response.user.email;
          draft.isLogIn = true;
        }),
      );
      localStorage.setItem("expires", Date.now() + 10 * 60 * 1000); //! 6minuti
      localStorage.setItem("username", response.user.username);
      localStorage.setItem("email", response.user.email);
      console.log("update user", response);
    },
  });

  function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get("password") !== formData.get("passwordConfirm")) {
      setErrorForm(" Le password non corrispondono");
      return;
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
    if (
      !user.indirizzo ||
      !user.indirizzo.citta ||
      !user.indirizzo.cap ||
      !user.indirizzo.via ||
      !user.telefono ||
      !user.password ||
      !user.email ||
      !user.cognome ||
      !user.nome
    ) {
      setErrorForm(" Completa tutti i campi");
      return;
    }
    mutate(user);
  }
  return (
    <form onSubmit={submitHandler} className={classFormProfile.form}>
      {errorForm && <p>{errorForm}</p>}

      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
            defaultValue={queryData?.user?.nome}
          />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            label="Cognome"
            placeholder="Cognome"
            defaultValue={queryData?.user?.cognome}
          />
        </div>

        <div className={classFormProfile["input-container"]}>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            defaultValue={queryData?.user?.email}
          />
        </div>
      </div>

      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
          />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            label="Password Confirm"
            placeholder="Password Confirm"
          />
        </div>
      </div>
      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="address"
            name="address"
            label="Indirizzo"
            placeholder="Address"
            defaultValue={queryData?.user?.indirizzo?.via}
          />
        </div>

        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="cap"
            name="cap"
            label="Cap"
            placeholder="Cap"
            defaultValue={queryData?.user?.indirizzo?.cap}
          />
        </div>

        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="city"
            name="city"
            label="Citta"
            placeholder="City"
            defaultValue={queryData?.user?.indirizzo?.citta}
          />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input
            type={"text"}
            id="phone"
            name="phone"
            label="Telefono"
            placeholder="Telefono"
            defaultValue={queryData?.user?.telefono}
          />
        </div>
      </div>
      <div>
        {data?.message ? (
          <p>{data.message}</p>
        ) : (
          <p>Vuoi salvare i tuoi dati?</p>
        )}
        <Button disabled={isLoading} type="submit" text="Salva" />
      </div>
    </form>
  );
}
