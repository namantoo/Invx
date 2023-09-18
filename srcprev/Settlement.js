import React from 'react';
import Navbar from './Navbar';
import Apiurl from './apiurl';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Settlement() {
  const apiu = Apiurl();

  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    axios.get(apiu + "/settlements/listallsettlements", {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response) => {
      // let initsettlements = [];
      console.log(response.data.settlements[0].created_at.$date);
      // let settle = response.data.settlements;
      setSettlements(response.data.settlements);
    }).catch((error) => {
      console.log(error);
    });
  },[]);
  
  return (
    <>
    <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
        <Navbar />
        <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Settlements</h1>
            </div>
          </header>
        </div>
    </div>
    <main className="-mt-32">
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <br></br>
          <div className="bg-white shadow sm:rounded-lg">
            {settlements.map(settlement => 
            <div className="px-4 py-5 sm:p-6" key={settlement.created_at.$date}>
              <h3 className="text-base font-semibold leading-6 text-gray-900">Settlement Date:&nbsp;&nbsp;<span className='font-semibold'>{settlement.created_at.$date}</span></h3>
              <h3 className="text-base font-semibold leading-6 text-gray-900">Amount:&nbsp;&nbsp;<span>{settlement.amount}</span></h3>
              <h3 className="text-base font-semibold leading-6 text-gray-900">Status:&nbsp;&nbsp;<span>{settlement.status}</span></h3>
              <h3 className="text-base font-semibold leading-6 text-gray-900">No of Transactions:&nbsp;&nbsp;<span>{settlement.no_of_success_txn}</span></h3>
              <h3 className="text-base font-semibold leading-6 text-gray-900">Start DateTime:&nbsp;&nbsp;<span>{settlement.start_time.$date}</span></h3>
              <h3 className="text-base font-semibold leading-6 text-gray-900">End DateTime:&nbsp;&nbsp;<span>{settlement.end_time.$date}</span></h3>
              
              {/* <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Change plan
                </button>
              </div> */}
            </div>
            )}
          </div>
          {/* <br></br>
          <br></br>
          <div>
          {settlements.map(settlement => 
            <div key={settlement.created_at.$date}>
              <span>{settlement.created_at.$date}</span>
              <span>{settlement.amount}</span>
              <span>{settlement.status}</span>
              <span>{settlement.no_of_success_txn}</span>
              <span>{settlement.start_time.$date}</span>
              <span>{settlement.end_time.$date}</span>
            </div>
          )}
          </div> */}
        </div>
    </main>
    </>
  );
}

export default Settlement;
