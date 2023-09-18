import React, { useState, createRef } from "react";
import Apiurl from "./apiurl";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from './assets/logo_large.png'

import $ from "jquery";
import axios from "axios";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
function Registerpg3() {
  const navigate = useNavigate();

  const apiu = process.env.REACT_APP_HAPI;
  const napi = process.env.REACT_APP_NAPI;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [Error, setError] = useState("");
  const email = sessionStorage.getItem("email");
 
  const phoneno = email
  const maskedEmail = phoneno.substring(0, 3) + "*".repeat(phoneno.length - 6) +  phoneno.substring(phoneno.length - 3);
  useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    const email_status = sessionStorage.getItem("email_status");

    if (email_status !== "true"){
          navigate('/signup');
    }
   
}, [navigate]);
  const otpRefs = Array.from({ length: 6 }, () => createRef());
  // console.log(otp);
  const handlePaste = (e, index) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/\d{6}/.test(pastedData)) return e.preventDefault();

    const digits = pastedData.split("");
    setOtp(digits);

    if (index === 4) {
      otpRefs[5].current.focus();
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    sendOtp();
  }, []);
  const sendOtp = () => {
    if (email) {
      var bodyFormData = new FormData();
      bodyFormData.append("email", email);

      axios({
        method: "POST",
        url: `${apiu}/otpverify/sendemailotp `,
        data: bodyFormData,
      })
        .then((response) => {
          // // console.log(response)
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };
  const verifyOtp = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("otp", otp.join(""));

    axios({
      method: "POST",
      url: `${apiu}/otpverify/verifyemailotp`,
      data: bodyFormData,
    })
      .then((response) => {
        // console.log(response);
        if (response.data.otp_verify === true) {
          navigate("/registerform");
          sessionStorage.removeItem("email_status");
          sessionStorage.setItem("email_verified","true");
        }
        if (response.data.otp_verify === false) {
         setError("Invalid OTP!")
        }
      })
      .catch((error) => {
        // console.log(error);
      });
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
                    Verify your email id
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                  <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST">
                      <div className="w-full">
                        <div className="bg-white h-64 py-3 rounded text-center">
                          <h1 className="text-2xl font-bold">
                            OTP Verification
                          </h1>
                          <div className="flex flex-col mt-4">
                            <span>Enter the OTP you received at</span>
                            <span className="font-bold">{maskedEmail}</span>
                          </div>

                          {/* <div
                            data-username="otibij"
                            data-channel="email"
                            data-nonce="0-8bf87e338f"
                            data-length="6"
                            data-form="registration"
                            className="flex flex-row justify-center text-center px-2 mt-5 ap-otp-inputs"
                          >
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="0"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="1"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="2"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="3"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="4"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="5"
                            />
                          </div> */}
                          <div
                            data-username="otibij"
                            data-channel="email"
                            data-nonce="0-8bf87e338f"
                            data-length="6"
                            data-form="registration"
                            className="flex flex-row justify-center text-center px-2 mt-5 ap-otp-inputs"
                          >
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={otpRefs[index]}
                                className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                                type="tel"
                                maxLength="1"
                                value={digit}
                                onPaste={(e) => handlePaste(e, index)}
                                onChange={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                data-index={index}
                              />
                            ))}
                          </div>
                          {Error && <div className="error text-red-500">{Error}</div>}
                          <div className="flex justify-center text-center mt-5">
                            <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                              <span onClick={sendOtp} className="font-bold">
                                Resend OTP
                              </span>
                              <i className="bx bx-caret-right ml-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="columns-2 items-center justify-between">
                        <div className="flex items-center">
                          <NavLink
                            to="/"
                            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Back
                          </NavLink>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={verifyOtp}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Registerpg3;
