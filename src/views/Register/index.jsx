import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../services/register.service";
import authService from "../../services/auth.service";

export default function Register() {
  let navigate = useNavigate();

  const [emailVal, setEmailVal] = useState();
  const [passwordVal, setPasswordVal] = useState();
  const [secPasswordVal, setSecPasswordVal] = useState();
  const [valStatus, setValStatus] = useState();

  const [emailMes, setEmailMes] = useState("");
  const [passwordMes, setPasswordMes] = useState("");
  const [secPasswordMes, setSecPasswordMes] = useState("");

  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [secPasswordReg, setSecPasswordReg] = useState("");

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
      setEmailMes("Niepoprawna składnia e-maila");
    }

    if (passwordRegex.test(passwordReg)) {
      setPasswordVal(true);
      setPasswordMes("");
    } else {
      setPasswordVal(false);
      setPasswordMes("Niepoprawna składnia hasła");
    }

    if (passwordReg === secPasswordReg) {
      setSecPasswordVal(true);
      setSecPasswordMes("");
    } else {
      setSecPasswordVal(false);
      setSecPasswordMes("Podane hasła nie zgadzają się");
    }

    if (emailVal === true && passwordVal === true && secPasswordVal === true) {
      setValStatus(true);
    }
  };

  const register = (e) => {
    e.preventDefault();

    if (valStatus === true) {
      Axios.post("http://localhost:5000/api/account/register", {
        email: emailReg,
        firstName: "Filip",
        lastName: "Sokol",
        password: passwordReg,
        confirmPassword: passwordReg,
        nationality: "Polska",
        province: "Śląsk",
        dateOfBirth: "2022-11-20T19:23:15.515Z",
        roleId: 1,

        // "firstName": "Filip",
        // "lastName": "Sokol",
        // "email": "sok.filip@gmail.com",
        // "password": "Gardgor11",
        // "confirmPassword": "Gardgor11",
        // "nationality": "Polska",
        // "province": "Śląsk",
        // "dateOfBirth": "2022-11-20T19:23:15.515Z",
        // "roleId": 1
      }).then((response) => {
        if (response.data.message === "") {
          navigate("/Login");
          window.location.reload();
        } else {
          setRegisterStatus(response.data.message);
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
    <div className="h-fullscreen flex justify-center items-center font-sora text-lightblack">
      <div className="bg-grey-lighter flex flex-col ">
        <div className="container flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-10 py-8 rounded shadow-md w-full">
            <h1 className="mb-8 text-3xl text-center">Rejestracja</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {emailMes}
            </div>

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              name="password"
              placeholder="Hasło"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {passwordMes}
            </div>

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              name="confirm_password"
              placeholder="Powtórz hasło"
              onChange={(e) => {
                setSecPasswordReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {secPasswordMes}
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-lightgreen text-white hover:bg-darkgreen focus:outline-none my-1"
              onClick={register}
            >
              Utwórz konto
            </button>

            <div className="text-center text-sm text-grey-dark mt-4 mx-8 sm:mx-10">
              Posiadasz już konto?
              <a
                className="ml-1 no-underline border-b border-blue text-blue hover:cursor-pointer hover:bg-darkgreen hover:text-white"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Zaloguj
              </a>
              .
            </div>
          </div>
          <div className="mt-6 h-1 text-xs text-rose-500">{registerStatus}</div>
        </div>
      </div>
    </div>
  );
}
