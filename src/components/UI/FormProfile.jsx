import Input from "./Input";
import Button from "./Button";

import classFormProfile from "./style/FormProfile.module.css";

export default function FormProfile() {
  return (
    <form className={classFormProfile.form}>
      <div className={classFormProfile["pass-container"]}>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
          />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
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
          />
        </div>

        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="cap"
            name="cap"
            label="Cap"
            placeholder="Cap"
          />
        </div>

        <div className={classFormProfile["input-container"]}>
          <Input
            type="text"
            id="city"
            name="city"
            label="Citta"
            placeholder="City"
          />
        </div>
        <div className={classFormProfile["input-container"]}>
          <Input
            type={"text"}
            id="phone"
            name="phone"
            label="Telefono"
            placeholder="Telefono"
          />
        </div>
      </div>
      <div>
     
        Vuoi salvare i tuoi dati? <Button text="Salva" />
      </div>
    </form>
  );
}
