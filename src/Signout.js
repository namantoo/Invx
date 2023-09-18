import React, {useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom'


function SignOut() {
   
    useEffect(() => {
      localStorage.clear()
    }, []);
  return (
    <>
        <Navigate to="/" />
    </>
  );
}

export default SignOut;
