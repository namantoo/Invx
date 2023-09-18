import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiurl from './apiurl';

function Signin() {
  const apiu = Apiurl();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // Redirect to the dashboard or any other protected route
      navigate("/dashboard");
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email_id", email);
    formData.append("password", password);

    axios
      .post(apiu + "/auth/merchantlogin", formData)
      .then((response) => {
        // console.log(response)
        localStorage.setItem("access_token", response.data.user.access);
        localStorage.setItem("refresh_token", response.data.user.refresh);
        localStorage.setItem("admin email", response.data.admin_email);
        // Redirect to the dashboard or any other protected route
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        if(error.response.status == 999) {
          console.log(error.response.data.error);
          alert(error.response.data.error);
        }
      });
    console.log("sumbitted");
    console.log(email);
    console.log(password);

  };

  return (
    <>
      <div className="container">
        <div className="row">
            <div className="three columns">&nbsp;</div>
            <div className="six columns">
                <div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <div className="mt-8">
              
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange}
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
                </div>
            </div>
            <div className="three columns">&nbsp;</div>
        </div>
      </div>
    </>
  );
}

export default Signin;
