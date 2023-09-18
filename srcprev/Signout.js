import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'


function SignOut() {
    localStorage.clear()
  return (
    <>
        <Navigate to="/signin" />
    </>
  );
}

export default SignOut;
