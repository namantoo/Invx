import React, { useState } from 'react'
import GoogleLogin from "react-google-login";
import axios from 'axios';
// import { jwt } from 'jsonwebtoken';
const clientID = "74592600768-ud51enbpin3g64s76q8bm4jtj1r7uo0s.apps.googleusercontent.com"
export const LoginGoogle = () => {
  const napi = process.env.REACT_APP_NAPI;
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
  const logoutGoogleSignUp = () => {
    // Redirect to the back-end Google authentication route
    const googleLogoutUrl = `${napi}/logout`; 
    const newWindow = window.open(
        googleLogoutUrl,
        "_blank",
        "width=500, height= 600"
    );
  };
  const [user, setUser] = useState(null);

  return (
    <div>
      <div>
      {/* <a class="button google" href="http://localhost:8081/auth/google">Sign in with Google</a> */}
      {/* <button className='p-2 bg-blue-400 rounded-md mb-2 ml-2' onClick={handleGoogleSignUp}>Sign up with Google</button> */}
      {/* <button className='p-2 bg-blue-400 rounded-md mb-2 ml-2' onClick={logoutGoogleSignUp}>Logout</button> */}
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
  )
}
