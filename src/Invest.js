import { useEffect } from "react";
import React from "react";
import Navbar from "./Navbar";
import "flowbite/dist/flowbite.min.css";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { ArrowDownIcon, ArrowUpIcon, ArrowTrendingUpIcon, PlusCircleIcon, WalletIcon, BanknotesIcon, CurrencyDollarIcon, CubeTransparentIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
// import Apiurl from "./apiurl";
import axios from "axios";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";



function Invest() {
  const apiu = process.env.REACT_APP_HAPI;
  const napi = process.env.REACT_APP_NAPI;

  const minvalue = 1;
  const token = sessionStorage.getItem("item_key");
 
  const formatter = new Intl.NumberFormat()
  const [walletbalance, setWalletbalance] = useState(0); //getmainwalletbalance
  const [principal, setPrincipal] = useState(0); //getprincipalbalance
  const [interest, setInterest] = useState(0);//getinterestbalance
  if(interest >= 0){
    var var5 = 'increase';
  }else{
    var var5 = 'decrease';
  }
if(principal === 0){
  var perearned = 0;
}else{
  var perearned = (interest / principal) * 100;
}
  const vaultvalue = principal + interest;


  const [value, setValue] = useState(10);
  const mark = [
    {
      value: minvalue,
      label: "$ " + formatter.format(minvalue),
    },
    {
      value: walletbalance,
      label: "$ " + formatter.format(walletbalance),
    },
  ];
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value);
    setValue(inputValue);
  };
  const chains = [
    { id: 1, name: "Ethereum" },
    { id: 2, name: "Polygon" },
    { id: 3, name: "Binance Smart Chain" },
    { id: 4, name: "Tron" },
  ];
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [walletaddress, setwalletaddress] = useState("heyhey");
  // // console.log(walletaddress)
  const [selected, setSelected] = useState(chains[0]);
 
  function handleWithdrawMain() {
    setOpen(true);
  }
  

  const [wvalue, setWValue] = useState(10);
  
  const wmark = [
    {
      value: minvalue,
      label: "$ " + formatter.format(minvalue),
    },
    {
      value: vaultvalue,
      label: "$ " + formatter.format(vaultvalue),
    },
  ];
  const handleWSliderChange = (event, newWValue) => {
    setWValue(newWValue);
  };
  const handleWInputChange = (event) => {
    const inputWValue = Number(event.target.value);
    setWValue(inputWValue);
  };
  const [wopen, setWOpen] = useState(false);
  const cancelWButtonRef = useRef(null);
  function handleWithdrawFix() {
    setWOpen(true);
  }


  const [dvalue, setDValue] = useState(10);
  // // console.log(dvalue)
  const maintofixed = () => {

    var bodyFormData = new FormData();
    bodyFormData.append('amount', dvalue);
   
    axios(
      {
        method: 'POST',
        url: `${apiu}/transfer/maintofixed`,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        setDOpen(false)
        // // console.log(response)
      })
      .catch()
  };
  const fixedtomain = () => {
   
    var bodyFormData = new FormData();
    bodyFormData.append('amount', wvalue);
   
    axios(
      {
        method: 'POST',
        url: `${apiu}/transfer/fixedtomain`,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        setWOpen(false)
        // console.log(response)
      })
      .catch()
  };
  const requestwithdraw = () => {
    // console.log("hey")
    var bodyFormData = new FormData();
    bodyFormData.append('amount', value);
    bodyFormData.append('wallet_address', walletaddress);
    bodyFormData.append('block_chain', selected.name);
   
   
    axios(  
      {
        method: 'POST',
        url: `${apiu}/withdraw/requestwithdraw`,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        setOpen(false)
        // console.log(response)
      })
      .catch()
  };
  const dmark = [
    {
      value: minvalue,
      label: "$ " + formatter.format(minvalue),
    },
    {
      value: walletbalance,
      label: "$ " + formatter.format(walletbalance),
    },
  ];
  const handleDSliderChange = (event, newDValue) => {
    setDValue(newDValue);
  };
  const handleDInputChange = (event) => {
    const inputDValue = Number(event.target.value);
    setDValue(inputDValue);
  };
  const [dopen, setDOpen] = useState(false);
  const cancelDButtonRef = useRef(null);
  function handleDepositFix() {
    setDOpen(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
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
        
        // // console.log(error);
    }
};
const getprincipalbalance = async () => {
  try {
      const res = await authAxios.get(`/analytics/getprincipalbalance`);
      // console.log(res)
      if(res.data.pricipal_balance === null){
        setPrincipal(0);
      }else{
        setPrincipal(res.data.pricipal_balance.balance)
      }

  } catch (error) {
      
      // // console.log(error);
  }
};

const getinterestbalance = async () => {
  try {
      const res = await authAxios.get(`/analytics/getinterestbalance`);
      // console.log(res)
      if(res.data.interest_balance === null){
          setInterest(0);
      }else{
        setInterest(res.data.interest_balance.balance)
      }
  } catch (error) {
      
      // // console.log(error);
  }
};


useEffect(() => {
  getmainwalletbalance();
  getprincipalbalance();
  getinterestbalance();
}, []);  
  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Navbar />
          <header className="py-10">
            <div className="mx-auto max-w-6xl px-4 md:px-0 lg:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Invest
              </h1>
            </div>
          </header>
        </div>
      </div>
      <main className="-mt-32">
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <br></br>
          <div>
            
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-4">
              <div className="h-84 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
                <div className="absolute rounded-md bg-indigo-500 p-3">
                      <BanknotesIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                </div>
                <p className="ml-16 truncate text-xl font-medium text-gray-500 break-all">
                      Primary<br></br>Wallet
                </p>
                <div className="flex items-baseline pb-6 sm:pb-7">
                  
                    <p className="text-3xl font-semibold text-gray-900 break-all">
                    <br></br>
                      <span className="text-2xl">wallet balance:<br></br></span>
                      
                      $ {formatter.format(walletbalance)}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        {/* <a
                          href="#"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Add Money &nbsp;&nbsp;<PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/>
                          
                        </a> */}
                        <button
                          onClick={handleWithdrawMain}
                          type="button"
                          className="float-left w-24 ring-1 rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                        >
                          withdraw
                        </button>
                        <a
                          href="/addmoney"
                          className="float-right w-24 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          add money
                        </a>
                      </div>
                    </div>
                </div>
              </div>
              <div className="h-84 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
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
                    <p className="text-3xl font-semibold text-gray-900 break-all">
                    <br></br>
                      <span className="text-2xl">vault value:<br></br></span>
                      $ {formatter.format(vaultvalue)}
                      <br></br>
                      <span className="text-lg">principal amount:<br></br></span>
                      $ {formatter.format(principal)}
                      <br></br>
                      <span className="text-lg">interest earned:<br></br></span>
                      {/* $ {formatter.format(interest)} */}
                      {/* <br></br> */}
                      <div className="ml-0 flex items-baseline pb-0 sm:pb-0">
                        <p
                        className={classNames(
                            var5 === "increase"
                            ? "text-green-600"
                            : "text-red-600",
                            "ml-0 flex items-baseline text-2xl font-semibold"
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
                        <span>$ {formatter.format(interest)}</span>
                    </p>
                    </div>
                    <div className="ml-0 flex items-baseline pb-0 sm:pb-0">
                        <span className={classNames(
                            var5 === "increase"
                            ? "text-green-600"
                            : "text-red-600",
                            "ml-0 flex items-baseline text-2xl font-semibold"
                        )}>&nbsp;({formatter.format(perearned)} %)</span>
                    </div>
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-base">
                        {/* <a
                          href="#"
                          className="justify-end flex flex-row font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Invest More &nbsp;&nbsp;<PlusCircleIcon aria-hidden="true" className="h-8 w-8 text-indigo-500"/>
                          
                        </a> */}
                        <button
                          onClick={handleWithdrawFix}
                          type="button"
                          className="float-left w-24 ring-1 rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                        >
                          withdraw
                        </button>
                        <button
                          onClick={handleDepositFix}
                          type="button"
                          className="float-right w-24 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          deposit
                        </button>
                      </div>
                    </div>
                </div>
              </div>
              <div className="h-84 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
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
              <div className="h-84 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-white">
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

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-4">
                <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-green-300">
                    &nbsp;
                </div>
                <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-green-300">
                    &nbsp;
                </div>
                <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-green-300">
                    &nbsp;
                </div>
                <div className="h-60 relative overflow-hidden rounded-lg px-10 pb-12 pt-5 shadow sm:px-6 sm:pt-6 bg-green-300">
                    &nbsp;
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL ONE */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                       
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                          
                        >
                          Request Withdraw
                        </Dialog.Title>
                       
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            All withdrawal requests will be processed in 24
                            hours after approval.
                          </p>
                        </div>
                        <div>
                          <div className="mt-6 text-center text-lg font-semibold text-gray-900">
                            Select Amount:
                          </div>
                          <div className="p-4 flex flex-col justify-start items-center">
                            <div className="w-32 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                $&nbsp;
                              </span>
                              <input
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="number"
                                value={value}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Typography
                                component={"span"}
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <Box width={300}>
                                  <Slider
                                    color="primary"
                                    value={value}
                                    min={minvalue}
                                    max={walletbalance}
                                    marks={mark}
                                    valueLabelDisplay="auto"
                                    onChange={handleSliderChange}
                                  />
                                </Box>
                              </Typography>
                            </div>

                            {/* </Modal> */}
                          </div>
                        </div>
                        <div>
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                  Choose chain
                                </Listbox.Label>
                                <div className="relative mt-2">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                      {selected.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {chains.map((chain) => (
                                        <Listbox.Option
                                          key={chain.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "bg-indigo-600 text-white"
                                                : "text-gray-900",
                                              "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={chain}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {chain.name}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-indigo-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                        <div>
                          <br></br>
                          {/* <form className="mt-5 sm:flex sm:items-center"> */}
                          <div className="w-full">
                            <label htmlFor="wallet" className="">
                              Wallet address
                            </label>
                            <input
                              type="text"
                              name="wallet"
                              id="wallet"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="your wallet address"
                              onChange={(e) => setwalletaddress(e.target.value)}
                            />
                          </div>
                          {/* <button
                                type="submit"
                                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                            >
                                Save
                            </button> */}
                          {/* </form> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    
                      onClick={requestwithdraw}
                    >
                      Request Withdraw
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      
      {/* MODAL TWO */}
      <Transition.Root show={wopen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelWButtonRef}
          onClose={setWOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Withdraw to main wallet
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Get instant withdrawal to your main wallet
                          </p>
                        </div>
                        <div className="sm:ml-12">
                          <div className="mt-6 text-center text-lg font-semibold text-gray-900">
                            Select Amount:
                          </div>
                          <div className="p-4 flex flex-col justify-start items-center">
                            <div className="w-32 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                $&nbsp;
                              </span>
                              <input
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="number"
                                value={wvalue}
                                onChange={handleWInputChange}
                              />
                            </div>
                            <div>
                              <Typography
                                component={"span"}
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <Box width={300}>
                                  <Slider
                                    color="primary"
                                    value={wvalue}
                                    min={minvalue}
                                    max={vaultvalue}
                                    marks={wmark}
                                    valueLabelDisplay="auto"
                                    onChange={handleWSliderChange}
                                  />
                                </Box>
                              </Typography>
                            </div>

                            {/* </Modal> */}
                          </div>
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      onClick={fixedtomain}
                    >
                      Withdraw
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setWOpen(false)}
                      ref={cancelWButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      

      <Transition.Root show={dopen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelWButtonRef}
          onClose={setDOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deposit to fixed return vault
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Get fixed return on assets in your fixed return wallet
                          </p>
                        </div>
                        <div className="sm:ml-12">
                          <div className="mt-6 text-center text-lg font-semibold text-gray-900">
                            Select Amount:
                          </div>
                          <div className="p-4 flex flex-col justify-start items-center">
                            <div className="w-32 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                $&nbsp;
                              </span>
                              <input
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="number"
                                value={dvalue}
                                onChange={handleDInputChange}
                              />
                            </div>
                            <div>
                              <Typography
                                component={"span"}
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <Box width={300}>
                                  <Slider
                                    color="primary"
                                    value={dvalue}
                                    min={minvalue}
                                    max={walletbalance}
                                    marks={dmark}
                                    valueLabelDisplay="auto"
                                    onChange={handleDSliderChange}
                                  />
                                </Box>
                              </Typography>
                            </div>

                            {/* </Modal> */}
                          </div>
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      onClick={maintofixed}
                    >
                      Deposit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDOpen(false)}
                      ref={cancelDButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Invest;