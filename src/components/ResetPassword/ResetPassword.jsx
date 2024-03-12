import React, { useState } from "react";

import classes from "./ResetPassword.module.scss";

import logo from "../../assets/logo.png";

import eye from "../../assets/eye.png";
import eyeClosed from "../../assets/eyeClosed.png";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError1, setPasswordError1] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const navigte = useNavigate();

  const togglePasswordVisible1 = () => {
    setIsPasswordVisible1((prev) => !prev);
  };
  const togglePasswordVisible2 = () => {
    setIsPasswordVisible2((prev) => !prev);
  };

  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordValid1 = password1.length >= 8;
    const isPasswordValid2 = password2.length >= 8;

    if (!password1 || !password2 || !isPasswordValid1 || !isPasswordValid2) {
      if (!isPasswordValid1)
        setPasswordError1("Please provide a valid password");
      if (!password1) setPasswordError1("Please provide a password");
      if (!isPasswordValid2)
        setPasswordError2("Please provide a valid password");
      if (!password2) setPasswordError2("Please provide a password");

      return;
    }

    navigte("/login");
  };

  return (
    <div className={classes.pageWrap}>
      <div className={classes.contentWrap}>
        <img src={logo} alt="logo" className={classes.logo} />
        <header className={classes.header}>Create new Password?</header>

        <form className={classes.form}>
          <div className={classes.inputs}>
            <div className={classes.inputBlock}>
              <div className={classes.inputWrap}>
                <img
                  src={isPasswordVisible1 ? eyeClosed : eye}
                  alt="show"
                  className={classes.eye}
                  onClick={togglePasswordVisible1}
                />
                <input
                  type={isPasswordVisible1 ? "text" : "password"}
                  placeholder="Password"
                  className={classes.input}
                  onChange={handlePassword1}
                  value={password1}
                  onFocus={() => {
                    passwordError1 ? setPasswordError1("") : null;
                  }}
                />
              </div>
              {passwordError1 && (
                <div className={classes.error}>{passwordError1}</div>
              )}
            </div>
            <div className={classes.inputBlock}>
              <div className={classes.inputWrap}>
                <img
                  src={isPasswordVisible2 ? eyeClosed : eye}
                  alt="show"
                  className={classes.eye}
                  onClick={togglePasswordVisible2}
                />
                <input
                  type={isPasswordVisible2 ? "text" : "password"}
                  placeholder="Password"
                  className={classes.input}
                  onChange={handlePassword2}
                  value={password2}
                  onFocus={() => {
                    passwordError2 ? setPasswordError2("") : null;
                  }}
                />
              </div>
              {passwordError2 && (
                <div className={classes.error}>{passwordError2}</div>
              )}
            </div>
          </div>

          <button className={classes.submitBtn} onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
