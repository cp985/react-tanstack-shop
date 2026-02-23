//! home in cui si ci logga e registra
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  useMutation } from "@tanstack/react-query";
import LogInForm from "../components/UI/LogInForm";
import { logIn, signUp } from "../util/httpRequest";
import classHome from "./style/Home.module.css";
export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error, data , reset} = useMutation({
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

  return (
    <div className={classHome.home}>
      <h1>Home Login</h1>
    

      <LogInForm
        subscribe={isSubscribed}
        toggleSubscribe={toggleSubscribe}
        submitHandler={submitHandler}
        submitHandlerSub={submitHandlerSub}
        backendError={isSubscribed ? errorSub?.message : error?.message}
      />
    </div>
  );
}
