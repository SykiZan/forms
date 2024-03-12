import React, { useState } from "react";

import classes from "./ForgotPassword.module.scss";

import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);

    if (!email || !isEmailValid) {
      if (!isEmailValid) setEmailError("Please provide a valid email");
      if (!email) setEmailError("Please provide an email");

      return;
    }
    navigate("/reset-password");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={classes.pageWrap}>
      <div className={classes.contentWrap}>
        <img src={logo} alt="logo" className={classes.logo} />
        <header className={classes.header}>Forgot Password?</header>

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

          <button
            type="submit"
            className={classes.submitBtn}
            onClick={handleSubmit}
          >
            Send
          </button>
          <button className={classes.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
