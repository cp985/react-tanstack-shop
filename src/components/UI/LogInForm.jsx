import { Form } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import classLogInForm from "./style/LogInForm.module.css";
export default function LogInForm({
  submitHandler,
  subscribe,
  toggleSubscribe,
}) {
  function formData(e) {
    const data = new FormData(e.currentTarget);
    const datiForm = Object.fromEntries(data.entries());
    submitHandler(datiForm);
  }

  return (
    <>
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
              {" "}
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
            onClick={toggleSubscribe}
          />
        </div>
      </Form>
    </>
  );
}
