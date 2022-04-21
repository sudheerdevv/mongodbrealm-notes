import * as Realm from "realm-web";
import "./styles/Login.css";
import loginImg from "./assets/loginbg.svg";
import googleImg from "./assets/google.svg";
import { app } from "./mongo";
import { useState } from "react";

export default function Login() {
  const [animateState, setAnimateState] = useState(false);

  const login = async () => {
    setAnimateState(true);

    //Get credentials from google login
    const credentials = await Realm.Credentials.google(
      process.env.REACT_APP_REDIRECT_URI
    );

    await app.logIn(credentials).then(() => window.location.reload(true));
  };

  return (
    <div className="login">
      <section className="loginBox">
        <img src={loginImg} alt="" />
        <button id="loginBtn" onClick={login}>
          {!animateState ? (
            <>
              Login with Google <img src={googleImg} alt="" />
            </>
          ) : (
            <div className="container">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
          )}
        </button>
      </section>
    </div>
  );
}
