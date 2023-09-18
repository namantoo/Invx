import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Middleware = () => {
  const navigate = useNavigate();
  const napi = process.env.REACT_APP_NAPI;
  // http://localhost:3002/dashboard?user=%7B%22familyName%22%3A%22an%22%2C%22givenName%22%3A%22Nam%22%2C%22email%22%3A%22namanmail4%40gmail.com%22%2C%22profile%22%3A%22https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAGNmyxZP6lhiW5zRXPZYTbGBEl7QNYkrIlv4pnqGUwOHHWs%3Ds96-c%22%2C%22id%22%3A%22105426078237238740307%22%7D
  const params = useParams();
  const [queryParameters] = useSearchParams();
  const familyName = queryParameters.get("familyName");
  const givenName = queryParameters.get("givenName");
  const email = queryParameters.get("email");
//   const photos = queryParameters.get("photos");
//   // console.log(photos);
  const id = queryParameters.get("id");
  const [status, setstatus] = useState("");

  // console.log(familyName, givenName, email,  id);

  // // console.log(typeof(user))
  // const { givenName, familyName, email, profile, id } = user;

  // const access = localStorage.getItem("googleAccess");
  // // console.log(access)
  useEffect(() => {
      createUser();

  }, []);
  // http://localhost:5050/auth/login/googlesignuptoken

  const signin = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);

    axios({
      method: "POST",
      url: `${napi}/auth/login/googlesignuptoken`,
      data: bodyFormData,
    })
      .then((response) => {
        // // console.log(response)
        const access = response.data.user.access;
        const refresh = response.data.user.refresh;
        localStorage.setItem("googleAccess", access);
        localStorage.setItem("googleRefresh", refresh);
         window.close()
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const createUser = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("givenName", givenName);
    bodyFormData.append("familyName", familyName);
    bodyFormData.append("email", email);
    // bodyFormData.append('photos', "photos");
    bodyFormData.append("id", id);
    axios({
      method: "POST",
      url: `${napi}/auth/login/creategoogleuser`,
      data: bodyFormData,
    })
      .then((response) => {
        // // console.log(response)
        // console.log(response.data.status);
        localStorage.setItem("googleStatus", response.data.status);
        localStorage.setItem("emailmail", email);
        localStorage.setItem("login_status", "true");
        // sessionStorage.setItem("login_status", "true");

        if(response.data.status === "true"){
            signin();
        }
        setstatus(response.data.status)
        if(response.data.status === "false"){
         window.close()
        }
        // window.close();
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  // signin()

  return(
    <>
      <div className="hidden">hey</div>
    </>
  ) ;
};

export default Middleware;
