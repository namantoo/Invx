import React, { useState, useEffect } from "react";
import Apiurl from "./apiurl";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from './assets/logo_large.png'

import { LoginGoogle } from "./LoginButton";

function Registerpg2() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [Error, setError] = useState("");
  const [TncError, setTncError] = useState("");
  const napi = process.env.REACT_APP_NAPI;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [TnC, setTnC] = useState(false);
  const [count, setCount] = useState(0);
  const myFormData = { email, password };
  const access = localStorage.getItem("googleAccess");
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      // console.log("1 sec")
      const access2 = localStorage.getItem("googleAccess");
      const status = localStorage.getItem("googleStatus");
      const login_status = localStorage.getItem("login_status");
      const login_status2 = sessionStorage.getItem("login_status");
      if (access2 !== null || login_status2 === "true" || login_status === "true") {
        navigate("/dashboard");
      }
    if(status === "false"){
      navigate("/registerform")
    }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // Google Sign up
  const handleGoogleSignUp = () => {
    // Redirect to the back-end Google authentication route
    const googleLoginUrl = `${napi}/auth/google`;
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500, height= 600"
    );
    // window.location.href = googleLoginUrl;
  };
  // Function for sending Email & Password
  const signin = () => {
    if (password === confirmPassword && TnC && email && isValidEmail(email)) {
      var bodyFormData = new FormData();
      bodyFormData.append("email", email);
      bodyFormData.append("password", password);
      axios({
        method: "POST",
        url: `${napi}/auth/email`,
        data: bodyFormData,
      })
        .then((response) => {
          // // console.log(response)

          navigate("/emailverify");

          sessionStorage.setItem("email", email);
          sessionStorage.setItem("email_status", "true");
          sessionStorage.setItem("login_status", "true");
          
        })
        .catch((error) => {
          // console.log(error);
        });
    }

    if (confirmPassword !== password) {
      setError("Password doesn't match");
    }
    if (!email || !password) {
      setError("Email Address or Password Missing!");
    }
    if (!TnC) {
      setTncError("Please agree to the terms and conditions");
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  };
  const isValidEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="fill-window bg-gray-50">
        <div className="container">
          <div className="row h-screen">
            <div className="columns two h-full hidden sm:block" style={{}}>
              &nbsp;
            </div>
            <div className="columns eight h-full" style={{}}>
              <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                   <img className="w-16 h-8 mx-auto" src={Logo} alt="logo" />
                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                  <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            name="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError("");
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="cpassword"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="cpassword"
                            name="cpassword"
                            type="password"
                            autoComplete="confirm-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="tandc"
                            name="tandc"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={(e) => setTnC(!TnC)}
                          />

                          <label
                            htmlFor="tandc"
                            className="ml-3 block text-sm leading-6 text-gray-900"
                          >
                            <span className="mt-10 text-center text-sm text-gray-500">
                              Please accept the{" "}
                              <a
                                href="#"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                              >
                                Terms & Conditions
                              </a>
                            </span>
                            {/* Remember me */}
                          </label>
                        </div>

                        {/* <div className="text-sm leading-6">
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot password?
                          </a>
                        </div> */}
                      </div>
                      {TncError && <div className="error text-red-500">{TncError}</div>}
                      {Error && <div className="error text-red-500">{Error}</div>}

                      <div>
                        <button
                          type="button"
                          onClick={signin}
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create an account
                        </button>
                      </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                      Already have an account?{" "}
                      <NavLink
                        to={"/"}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Login Here
                      </NavLink>
                    </p>
                    <div>
                      <div className="relative mt-10">
                        <div
                          className="absolute inset-0 flex items-center"
                          aria-hidden="true"
                        >
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                          <span className="bg-white px-6 text-gray-900">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4">
                        <button
                          type="button"
                          className="w-full justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                          onClick={handleGoogleSignUp}
                        >
                          <svg
                            className="w-4 h-4 mr-2 -ml-1"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          <span>Sign in with Google</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns two h-full hidden sm:block" style={{}}>
              &nbsp;
            </div>
          </div>
          <div className="">&nbsp;</div>
        </div>
      </div>
    </>
  );
}

export default Registerpg2;
