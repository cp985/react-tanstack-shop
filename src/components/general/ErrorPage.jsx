import { useEffect, useState } from "react";
import classError from "./style/ErrorPage.module.css";
import { useRouteError, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
export default function ErrorPage() {
  const redirectionTime = 5000;
  const [redirectionCount, setRedirectionCount] = useState(
    redirectionTime / 1000,
  );
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage = "Qualcosa è andato storto";

if (error?.data) {
    if (typeof error.data === "object") {
      errorMessage = error.data.message || errorMessage;
    } else if (typeof error.data === "string") {
      try {
        const parsed = JSON.parse(error.data);
        errorMessage = parsed.message || errorMessage;
      } catch {
        errorMessage = error.data;
      }
    }
  }
useEffect(() => {
    if (error.status === 401 || error.status === 404 || error.status === 403) {
      let interval = setTimeout(() => {
        setRedirectionCount(redirectionCount - 1);
      }, 1000);
      if (redirectionCount === 0) {
        navigate(error.status === 403 ? "/app/home" : "/");
      }
      return () => clearTimeout(interval);
    }
  }, [redirectionCount, error, navigate]);
  if (!error?.status || error.status >= 500) {
  return (
    <div className={classError.errorPage}>
      <h2>🚧 Lavori in corso</h2>
      <p>Il server è temporaneamente non disponibile, riprova più tardi.</p>
      <Button text={"Riprova"} onClick={() => window.location.reload()} />
    </div>
  );
}

if (error.status === 403) {
  return (
    <div className={classError.errorPage}>
      <h2>🚫 Accesso negato</h2>
      <p>Non hai i permessi per visualizzare questa pagina.</p>
      <p>Verrai reindirizzato tra {redirectionCount}</p>
      <Button text={"Homepage"} isLink={true} path={"/app/home"} />
    </div>
  );
}

  return (
    <div className={classError.errorPage}>
      <h2>ErrorPage status {error.status}</h2>
      <p>{errorMessage}</p>
      <p>verrai reindirizzato alla home tra {redirectionCount}</p>
      <Button text={"Homepage"} isLink={true} path={"/"} />
    </div>
  );
}
