import { Form } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import classLogInForm from "./style/LogInForm.module.css";
import { textReg, emailReg, usernameReg, passwordReg } from "../../util/auth";

export default function LogInForm({
  submitHandler,
  subscribe,
  toggleSubscribe,
  submitHandlerSub,
  backendError,
}) {
  const [errorList, setErrorList] = useState([]);

  function formData(e) {
    e.preventDefault();
    const error = [];
    const data = new FormData(e.currentTarget);
    const datiForm = Object.fromEntries(data.entries());
    const { email, username, password, passwordConfirm } = datiForm;

    if (!emailReg(email)) {
      error.push("Email non valida");
    }
    if (!passwordReg(password)) {
      error.push(
        "Password non valida: almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale (@$!%*?&).",
      );
    }
    if (subscribe) {
      if (!usernameReg(username)) {
        error.push("Username non valido");
      }
      if (password !== passwordConfirm) {
        error.push("Le password non corrispondono");
      }
    }

    setErrorList(error); // sempre, sia login che subscribe
    if (error.length > 0) return; // sempre, sia login che subscribe

    delete datiForm.passwordConfirm;
    if (subscribe) {
      submitHandlerSub(datiForm);
    } else {
      submitHandler(datiForm);
    }
  }
  return (
    <>
      {(errorList.length > 0 || backendError) && (
        <ul>
          {errorList?.map((err) => (
            <li key={err}>{err}</li>
          ))}
          {backendError && <li>{backendError}</li>}
        </ul>
      )}
      <Form
        className={classLogInForm["form-login"]}
        noValidate
        onSubmit={formData}
      >
        <h3>{subscribe ? "Registrati" : "Accedi"}</h3>

        <fieldset>
          <div className={classLogInForm["input-container"]}>
            <Input type="email" id="email" name="email" label="Email" />
          </div>
          <div className={classLogInForm["input-container"]}>
            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
            />
          </div>
        </fieldset>
        {subscribe && (
          <fieldset>
            <div className={classLogInForm["input-container"]}>
              <Input
                type="text"
                id="username"
                name="username"
                label="Username"
              />
            </div>
            <div className={classLogInForm["input-container"]}>
              <Input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                label="Conferma Password"
              />
            </div>
          </fieldset>
        )}
        <Button text={subscribe ? "Registrati" : "Accedi"} />
        <div>
          <p>{subscribe ? "Hai già un account?" : "Non hai un account?"}</p>
          <Button
            type="button"
            classOf="second"
            text={subscribe ? "Accedi" : "Registrati"}
            onClick={() => {
              toggleSubscribe();
              setErrorList([]);
            }}
          />
        </div>
      </Form>
    </>
  );
}
