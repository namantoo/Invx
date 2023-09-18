import { useEffect, useState } from "react";
import React from "react";
import Navbar from "./Navbar";
import "flowbite/dist/flowbite.min.css";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { ArrowDownIcon, ArrowUpIcon, ArrowTrendingUpIcon, PlusCircleIcon, WalletIcon, BanknotesIcon, CurrencyDollarIcon, CubeTransparentIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import Apiurl from "./apiurl";
import axios from "axios";



function DashBoard() {
  const apiu = process.env.REACT_APP_HAPI;
  const napi = process.env.REACT_APP_NAPI;

  // console.log(napi, apiu)

  const formatter = new Intl.NumberFormat()
  const token = sessionStorage.getItem("item_key");
    
  const var1 = 'Portfolio Value';
 
  const [var4, setvar4] = useState(0);
  // const var4 = 122; // getinterestbalance
  var var5 = null;
  if (var4 >= 0) {
    var5 = 'increase';
  } else {
    var5 = 'decrease';
  }
  const [todayearning, settodayearning] = useState(0);
  // const todayearning = 100; //todayearning
  
  const [walletbalance, setWalletbalance] = useState(0);
  const [fixedreturn, setFixedretun] = useState(0);
  const var2 = walletbalance + fixedreturn; // getprincipalbalance + getinterestbalance
  if(var2 === 0){
  var perearned = 0;
  }else{
    var perearned = (var4 / var2) * 100;
  }
 



  // get mainwallet
 

  // console.log(apiu)
  const authAxios = axios.create({
    baseURL: apiu,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
const getmainwalletbalance = async () => {
    try {
        const res = await authAxios.get(`/analytics/getmainwalletbalance`);
        // console.log(res)
        if(res.data.wallet_balance === null){
            setWalletbalance(0);
        }else{
          setWalletbalance(res.data.wallet_balance.balance)
        }

    } catch (error) {
        
        // console.log(error);
    }
};
const getprincipalbalance = async () => {
  try {
      const res = await authAxios.get(`/analytics/getprincipalbalance`);
      // console.log(res)
      if(res.data.pricipal_balance === null){
          setFixedretun(0);
      }else{
        setFixedretun(res.data.pricipal_balance.balance)
      }

  } catch (error) {
      
      // console.log(error);
  }
};
const getinterestbalance = async () => {
  try {
      const res = await authAxios.get(`/analytics/getinterestbalance`);
      // console.log(res)
      if(res.data.interest_balance === null){
          setvar4(0);
      }else{
        setvar4(res.data.interest_balance.balance)
      }

  } catch (error) {
      
      // console.log(error);
  }
};

const todaysearning = async () => {
  try {
      const res = await authAxios.get(`/analytics/todaysearning`);
      // console.log(res)
      if(res.data.todays_earning === null){
          settodayearning(0);
      }else{
        settodayearning(res.data.todays_earning.balance)
      }

  } catch (error) {
      
      // console.log(error);
  }
};
useEffect(() => {
  getmainwalletbalance();
  getprincipalbalance();
  getinterestbalance();
  todaysearning();

    
}, []);  

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
         <Navbar/>
          <header className="py-10">
            <div className="mx-auto max-w-6xl px-4 md:px-0 lg:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                My Dashboard
              </h1>
            </div>
          </header>
        </div>
      </div>
      <main className="-mt-32">
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <br></br>
          <div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
              <div className="h-84 relative overflow-hidden rounded-lg bg-white px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <div className="absolute rounded-md bg-indigo-500 p-3">
                      <CurrencyDollarIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500">
                      Portfolio Value
                </p>
                <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-4xl font-semibold text-gray-900">
                      $ {formatter.format(var2)}
                    </p>
                    
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        <a
                          href="/invest"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Invest more &nbsp;&nbsp;<PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/>
                          {/* <span className="sr-only"> {var1} stats</span> */}
                        </a>
                      </div>
                    </div>
                </div>
                <div className="ml-12 flex items-baseline pb-6 sm:pb-7">
                    <p
                      className={classNames(
                        var5 === "increase"
                          ? "text-green-600"
                          : "text-red-600",
                        "ml-2 flex items-baseline text-2xl font-semibold"
                      )}
                    >
                      {var5 === "increase" ? (
                        <ArrowUpIcon
                          className="h-8 w-8 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-8 w-8 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {" "}
                        {var5 === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span>
                      <span>$ {formatter.format(var4)}</span>
                      <span>&nbsp;&nbsp;({formatter.format(perearned)} %)</span>
                    </p>
                </div>
                <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="truncate text-lg font-medium text-gray-500">
                        Today's Earnings
                  </p>
                  <p
                      className={classNames(
                        todayearning >= 0
                          ? "text-green-600"
                          : "text-red-600",
                        "ml-2 flex items-baseline text-lg font-semibold"
                      )}
                    >
                      {todayearning >= 0 ? (
                        <ArrowUpIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}

                      {/* <span className="sr-only">
                        {" "}
                        {var5 === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span> */}
                      $ {formatter.format(todayearning)}
                    </p>
                </div>
              </div>
              <div className="h-84 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-green-300">
                  &nbsp;
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-4">
              <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
                <div className="absolute rounded-md bg-indigo-500 p-3">
                      <BanknotesIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500 break-all">
                      Wallet<br></br>Balance
                </p>
                <div className="flex items-baseline pb-6 sm:pb-7">
                    <p className="text-4xl font-semibold text-gray-900 break-all">
                      <br></br>
                    
                      $ {formatter.format(walletbalance)}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        <a
                          href="/addmoney"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Add Money &nbsp;&nbsp;<PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/>
                          {/* <span className="sr-only"> {var1} stats</span> */}
                        </a>
                      </div>
                    </div>
                </div>
              </div>
              <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
              <div className="absolute rounded-md bg-indigo-500 p-3">
                      <WalletIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500 break-all">
                      Fixed Return<br></br>Vault
                </p>
                <div className="flex items-baseline pb-6 sm:pb-7">
                  
                    <p className="text-4xl font-semibold text-gray-900 break-all">
                    <br></br>
                      $ {formatter.format(fixedreturn)}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        <a
                          href="/invest"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Invest More &nbsp;&nbsp;<PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/>
                          {/* <span className="sr-only"> {var1} stats</span> */}
                        </a>
                      </div>
                    </div>
                </div>
              </div>
              <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
              <div className="absolute rounded-md bg-indigo-500 p-3">
                      <ArrowTrendingUpIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500">
                      Crypto<br></br>Indices
                </p>
                <div className="flex items-baseline pb-6 sm:pb-7">
                    <p className="text-4xl font-semibold text-gray-300 break-all">
                    <br></br>
                      $0
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        <a
                          href="#"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                        Know More &nbsp;&nbsp;
                        {/* <PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/> */}
                          {/* <span className="sr-only"> {var1} stats</span> */}
                        </a>
                      </div>
                    </div>
                </div>
              </div>
              <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
              <div className="absolute rounded-md bg-indigo-500 p-3">
                      <CubeTransparentIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500">
                      Staked<br></br>Balance
                </p>
                <div className="flex items-baseline pb-6 sm:pb-7">
                    <p className="text-4xl font-semibold text-gray-300 break-all">
                    <br></br>
                      $0
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        <a
                          href="#"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Know more &nbsp;&nbsp;
                          {/* <PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/> */}
                          {/* <span className="sr-only"> {var1} stats</span> */}
                        </a>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashBoard;