import React, { useState, useEffect } from "react";
import Apiurl from "./apiurl";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from './assets/logo_large.png'

function Forgotpassword(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const [Error, setError] = useState("");
    const [Success, setsuccess] = useState("");
   
   
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
                <img className="w-16 h-8 mx-auto" src={Logo} alt="logo" />

                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Forgot Password
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
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          OTP
                        </label>
                        <div className="mt-2">
                          <input
                            id="oldpassword"
                            name="oldpassword"
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
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          New Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="newpassword"
                            name="newpassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setnewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                         Confirm New Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="confirmpassword"
                            name="confirmpassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setconfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                        <div>
                            <h1 className="text-red-500">{Error}</h1>
                        </div>
                    
                      <div>
                        <button
                          type="button"
                      
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           Change Password
                        </button>
                      </div>
                    </form>
                    <div>
                      <div className="relative mt-10">
                        <div
                          className="absolute inset-0 flex items-center"
                          aria-hidden="true"
                        >
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                          <span className="text-green-500 bg-white px-6 text-gray-900">
                           {Success}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4">
                        <NavLink
                          to="/"
                          className="w-full justify-center text-white  bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"

                        >
                          <span>Sign in</span>
                        </NavLink>
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

export default Forgotpassword;
