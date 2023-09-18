import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = () => {
    const auth = localStorage.getItem("access_token");
    // console.log(auth);
    return (
        auth ? <Outlet/> : <Navigate to="/signin" />
    )
}

export default PrivateRoutes