import Profile from './Profile';
import Signin from './Signin';
import DashBoard from './Dashboard';
import PrivateRoutes from './Protected';
import Transactions from './Transactions';
import Settlement from './Settlement';
import React from 'react';
import SignOut from './Signout';
import './skeleton.css'
import Settings from './Settings';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registerpg1 from './Register1';
import Registerpg2 from './Register2';
import Registerpg3 from './Register3';
import Registerpg4 from './Register4';
import Registerpg5 from './Register5';
import Home from './selectorelem';
import Chart from './Chart';
import Addmoney from './Addmoney';
// import CountrySelector from './selector';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/registerpg1" element={<Registerpg1 />} />
          <Route path="/registerpg2" element={<Registerpg2 />} />
          <Route path="/registerpg3" element={<Registerpg3 />} />
          <Route path="/registerpg4" element={<Registerpg4 />} />
          <Route path="/registerpg5" element={<Registerpg5 />} />
          <Route path="/selectortest" element={<Home />} />
          <Route path="/addmoney" element={<Addmoney/>} />
          <Route path="/chart" element={<Chart />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settlements" element={<Home />} />
          </Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
