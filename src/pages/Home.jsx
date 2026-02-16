//! home in cui si ci logga e registra
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import LogInForm from "../components/UI/LogInForm";
import { logIn } from "../util/httpRequest";
import { DUMMY_USERS } from "../util/dataDummy";

import classHome from "./style/Home.module.css";
export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: (user ) => logIn( user),
    onSuccess: (response) => {
      console.log("onSuccess data", response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("expires", Date.now() + 10 * 60 * 1000); //! 6minuti
      localStorage.setItem("username", response.user.nome);
      navigate("/app/home");
    },
  });

  function toggleSubscribe() {
    setIsSubscribed(!isSubscribed);
  }

  function submitHandler(user) {
    mutate(user );
  }

  return (
    <div className={classHome.home}>
      <h1>Home Login{data && data.password}</h1>
      {isError && <p>{error.message}</p>}

      <LogInForm
        subscribe={isSubscribed}
        toggleSubscribe={toggleSubscribe}
        submitHandler={submitHandler}
      />
    </div>
  );
}
