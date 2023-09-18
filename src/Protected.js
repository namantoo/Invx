import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const Protected = (props) => {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        // const accessToken = localStorage.getItem('accessToken');
        const status = sessionStorage.getItem('login_status');
        const status2 = localStorage.getItem('login_status');
        if (status === null && status2 === null){
              navigate('/');
        }
       
    }, [navigate]);

  return (
    
      <Component />
   
  )
}

export default Protected