import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../services/register.service";
import authService from "../../services/auth.service";
import styles from "./Register.module.scss";
import { notification } from "antd";

export default function Register() {
  const navigate = useNavigate();

  const [emailVal, setEmailVal] = useState();
  const [passwordVal, setPasswordVal] = useState();
  const [secPasswordVal, setSecPasswordVal] = useState();
  const [firstNameVal, setFirstNameVal] = useState();
  const [lastNameVal, setLastNameVal] = useState();
  const [birthdayVal, setBirthdayVal] = useState();
  const [valStatus, setValStatus] = useState();

  const [emailMes, setEmailMes] = useState("");
  const [passwordMes, setPasswordMes] = useState("");
  const [secPasswordMes, setSecPasswordMes] = useState("");
  const [firstNameMes, setFirstNameMes] = useState("");
  const [lastNameMes, setLastNameMes] = useState("");
  const [birthdayMes, setBirthdayMes] = useState("");

  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [secPasswordReg, setSecPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [birthdayReg, setBirthdayReg] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  const useAuth = () => {
    const token = authService.getCurrentUser();

    return token && token;
  };

  const isLoggenIn = useAuth();

  useEffect(() => {
    isLoggenIn && navigate("/");
  }, []);

  const validation = () => {
    if (emailRegex.test(emailReg)) {
      setEmailVal(true);
      setEmailMes("");
    } else {
      setEmailVal(false);
      setEmailMes("Invalid email syntax");
    }

    if (passwordRegex.test(passwordReg)) {
      setPasswordVal(true);
      setPasswordMes("");
    } else {
      setPasswordVal(false);
      setPasswordMes("Invalid password syntax");
    }

    if (passwordReg === secPasswordReg) {
      setSecPasswordVal(true);
      setSecPasswordMes("");
    } else {
      setSecPasswordVal(false);
      setSecPasswordMes("The entered passwords do not match");
    }

    if (firstNameReg !== "") {
      setFirstNameVal(true);
      setFirstNameMes("");
    } else {
      setFirstNameVal(false);
      setFirstNameMes("Enter your firstname");
    }

    if (lastNameReg !== "") {
      setLastNameVal(true);
      setLastNameMes("");
    } else {
      setLastNameVal(false);
      setLastNameMes("Enter your firstname");
    }

    if (birthdayReg !== "") {
      setBirthdayVal(true);
      setBirthdayMes("");
    } else {
      setBirthdayVal(false);
      setBirthdayMes("Enter your date of birth");
    }

    if (
      emailVal === true &&
      passwordVal === true &&
      secPasswordVal === true &&
      firstNameVal === true &&
      lastNameVal === true &&
      birthdayVal === true
    ) {
      setValStatus(true);
    }
  };

  const register = (e) => {
    e.preventDefault();

    if (valStatus === true) {
      Axios.post(
        "https://student-service-app.azurewebsites.net/api/account/register",
        {
          email: emailReg,
          firstName: firstNameReg,
          lastName: lastNameReg,
          password: passwordReg,
          confirmPassword: passwordReg,
          nationality: "Polska",
          province: "Slask",
          dateOfBirth: birthdayReg,
          roleId: 1,
        }
      ).then((response) => {
        if (response.data === "") {
          navigate("/login");
          notification.success({
            message: "Registered successfully.",
          });
        } else {
          setRegisterStatus("Register error.");
        }
      });
    } else {
      validation();
    }
  };

  useEffect(() => {
    if (emailReg !== "" || passwordReg !== "") {
      validation();
    }
  });

  return isLoggenIn ? null : (
    <div className={styles.container}>
      <form onSubmit={register} className={styles.formBox}>
        <div className={styles.formTitle}>Register</div>

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{emailMes}</div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{passwordMes}</div>

        <input
          type="password"
          name="password"
          placeholder="Repeat password"
          onChange={(e) => {
            setSecPasswordReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{secPasswordMes}</div>

        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{firstNameMes}</div>

        <input
          type="text"
          name="lastname"
          placeholder="Surname"
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{lastNameMes}</div>

        <input
          type="text"
          name="birthday"
          placeholder="Date of birth"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e) => {
            setBirthdayReg(e.target.value);
          }}
        />

        <div className={styles.inputLabel}>{birthdayMes}</div>

        <button type="submit" className={styles.loginButton}>
          Create account
        </button>
        <p className={styles.bottomMessage}>
          Already have an account?
          <a
            className={styles.bottomLink}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </a>
          .
        </p>
      </form>
      <p className={styles.loginMessage}>{registerStatus}</p>
    </div>
  );
}
