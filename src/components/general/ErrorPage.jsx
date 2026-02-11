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
    if (error.status === 401 || error.status === 404) {
      let interval = setTimeout(() => {
        setRedirectionCount(redirectionCount - 1);
      }, 1000);

      if (redirectionCount === 0) {
        navigate("/");
      }
      return () => clearInterval(interval);
    }
  }, [redirectionCount, error, navigate]);

  return (
    <div className={classError.errorPage}>
      <h1>ErrorPage status {error.status}</h1>
      <p>{errorMessage}</p>
      <p>verrai reindirizzato alla home tra {redirectionCount}</p>
      <Button text={"Go to Home"} isLink={true} path={"/"} />
    </div>
  );
}
