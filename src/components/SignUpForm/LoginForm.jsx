import React, { useState } from "react";

import classes from "./SignUpForm.module.scss";

import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import git from "../../assets/git.png";
import eye from "../../assets/eye.png";
import eyeClosed from "../../assets/eyeClosed.png";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(email);
  };

  const postForm = async () => {
    const payload = JSON.stringify({ email, password });

    try {
      const res = await fetch("https://auth-qa.qencode.com/v1/auth/login", {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // if (data.hasOwnProperty("error"))
      //   setPasswordError("Incorrect password or no such user found");

      window.location.href = "https://cloud.qencode.com/";
    } catch {
      console.log("an error occured");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 8;

    if (!email || !password || !isEmailValid || !isPasswordValid) {
      if (!isEmailValid) setEmailError("Please provide a valid email");
      if (!email) setEmailError("Please provide an email");
      if (!isPasswordValid)
        setPasswordError("Password must be at least 8 characters");
      if (!password) setPasswordError("Please provide a password");
      return;
    }

    postForm();
  };

  return (
    <div className={classes.pageWrap}>
      <div className={classes.contentWrap}>
        <img src={logo} alt="logo" className={classes.logo} />
        <header className={classes.header}>Log in to your account</header>
        <div className={classes.socialButtons}>
          <button className={classes.socialButton}>
            <img src={google} alt="google" />
            <div className={classes.socialBtnText}>Google</div>
          </button>
          <button className={classes.socialButton}>
            <img src={git} alt="git" />
            <div className={classes.socialBtnText}>Github</div>
          </button>
        </div>
        <div className={classes.separator}>
          <div className={classes.line}></div>
          <div className={classes.or}>OR</div>
          <div className={classes.line}></div>
        </div>
        <form className={classes.form}>
          <div className={classes.inputs}>
            <div className={classes.inputBlock}>
              <div className={classes.inputWrap}>
                <input
                  type="email"
                  placeholder="Email"
                  className={classes.input}
                  onChange={handleEmail}
                  value={email}
                  onFocus={() => {
                    emailError ? setEmailError("") : null;
                  }}
                />
              </div>
              {emailError && <div className={classes.error}>{emailError}</div>}
            </div>
            <div className={classes.inputBlock}>
              <div className={classes.inputWrap}>
                <img
                  src={isPasswordVisible ? eyeClosed : eye}
                  alt="show"
                  className={classes.eye}
                  onClick={togglePasswordVisible}
                />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={classes.input}
                  onChange={handlePassword}
                  value={password}
                  onFocus={() => {
                    passwordError ? setPasswordError("") : null;
                  }}
                />
              </div>
              {passwordError && (
                <div className={classes.error}>{passwordError}</div>
              )}
            </div>
          </div>
          <div className={classes.forgot}>
            <Link to="/forgot-password" className={classes.forgotLink}>
              Forgot your password?
            </Link>
          </div>
          <button className={classes.submitBtn} onClick={handleLogin}>
            Log in to Qencode
          </button>
          <footer className={classes.footer}>
            <div className={classes.footerText}>
              Is your company new to Qencode?
            </div>
            <Link to="/sign-up" className={classes.link}>
              Sign up
            </Link>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
