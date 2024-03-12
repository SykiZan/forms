import React, { useState } from "react";

import classes from "./SignUpForm.module.scss";

import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import git from "../../assets/git.png";

import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(email);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);

    if (!email || !isEmailValid) {
      if (!isEmailValid) setEmailError("Please provide a valid email");
      if (!email) setEmailError("Please provide an email");

      return;
    }

    navigate("/login");

 
  };

  return (
    <div className={classes.pageWrap}>
      <div className={classes.contentWrap}>
        <img src={logo} alt="logo" className={classes.logo} />
        <header className={classes.header}>Sign up to your account</header>
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
          </div>

          <button className={classes.submitBtn} onClick={handleSignUp}>
            Sign up to Qencode
          </button>
          <footer className={classes.footer}>
            <div className={classes.footerText}>
              Is your company new to Qencode?
            </div>
            <Link to="/login" className={classes.link}>
              Log in
            </Link>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
