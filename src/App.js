import Profile from './Profile';
import Signin from './Signin';
import DashBoard from './Dashboard';
import Protected from './Protected';
import Transactions from './Transactions';
import Settlement from './Settlement';
import React from 'react';
import SignOut from './Signout';
import './skeleton.css'
import './threedots.scss'
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
import Error from './Error';
import Main from './Main';
import Middleware from './Middleware';
import Invest from './Invest';
import TransactionsFv from './Transactionsfv';
import Withdrawals from './Withdrawals';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
// import CountrySelector from './selector';

function App() {
  return (
    <>
    <Router>
        <Routes>
          {/* <Route path="/signin" element={<Registerpg1 />} /> */}
          <Route path="/" element={<Registerpg1 />} />

          <Route path="/signup" element={<Registerpg2 />} />  
          <Route path="/emailverify" element={<Registerpg3 />} />
          <Route path="/registerform" element={<Registerpg4 />} />
          <Route path="/phoneverify" element={<Registerpg5 />} />
          <Route path="/middleware" element={<Middleware />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          {/* <Route path="/dashboard" element={<Protected Component={DashBoard} />} /> */}
          
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* <Route path="/invest" element={<Protected Component={Invest} />} /> */}
          {/* <Route path="/transactions"  element={<Protected Component={Transactions} />}  /> */}
          <Route path="/withdrawals"element={<Protected Component={Transactions} />}  />

          <Route path="/forgotpassword" element={<Forgotpassword />} />
          {/* <Route path="/signout" element={<SignOut />} /> */}
         
          <Route path="/transactionsfv" element={<TransactionsFv />} />
          <Route path="/selectortest" element={<Home />} />
          <Route path="/addmoney" element={<Addmoney/>} />
          <Route path="/chart" element={<Chart />} />
         
          <Route path="/settlements" element={<Home />} />
          <Route path="*" element={<Error />} /> 
          {/* <Route path="/main" element={<Main />} /> */}
          {/* <Route element={<PrivateRoutes />}> */}
            {/* <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/dashboard" element={<DashBoard />} /> */}
            {/* <Route path="/transactions" element={<Transactions />} />
           */}
          {/* </Route> */}
        </Routes>
    </Router>
    </>
  );
}

export default App;
