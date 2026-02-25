//! home in cui si ci logga e registra
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import LogInForm from "../components/UI/LogInForm";
import { logIn, signUp } from "../util/httpRequest";
import classHome from "./style/Home.module.css";
export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const messageDeleteAccount = useLocation().state?.message;
  const { mutate, isLoading, isError, error, data, isPending, reset } =
    useMutation({
      mutationFn: (user) => logIn(user),
      onSuccess: (response) => {
        console.log("onSuccess data", response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("expires", Date.now() + 10 * 60 * 1000); //! 6minuti
        localStorage.setItem("username", response.user.username);
        localStorage.setItem("email", response.user.email);
        navigate("/app/home");
      },
    });

  const {
    mutate: mutateSub,
    isLoading: isLoadingSub,
    isError: isErrorSub,
    error: errorSub,
    data: dataSub,
    isPending: isPendingSub,
    reset: resetSub,
  } = useMutation({
    mutationFn: (user) => signUp(user),
    onSuccess: (response) => {
      console.log("onSuccess data", response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("expires", Date.now() + 10 * 60 * 1000); //! 6minuti
      localStorage.setItem("username", response.user.username);
      navigate("/app/home");
    },
  });

  function toggleSubscribe() {
    setIsSubscribed(!isSubscribed);
    reset();
    resetSub();
  }

  function submitHandler(user) {
    mutate(user);
  }

  function submitHandlerSub(user) {
    mutateSub(user);
  }

  useEffect(() => {
    if (messageDeleteAccount) {
      const timer = setTimeout(() => {
        navigate(".", { replace: true, state: {} });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messageDeleteAccount, navigate]);

  return (
    <div className={classHome.home}>
      <h1>The Golden-Pixel Inn</h1>
      {messageDeleteAccount && <h2 className={classHome.message}> {messageDeleteAccount}</h2>}

      <LogInForm
        subscribe={isSubscribed}
        toggleSubscribe={toggleSubscribe}
        submitHandler={submitHandler}
        submitHandlerSub={submitHandlerSub}
        backendError={isSubscribed ? errorSub?.message : error?.message}
        isPendingSub={isPendingSub}
        isPendingLogin={isPending}
      />
    </div>
  );
}
