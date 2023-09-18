import { useEffect, useState, useRef } from "react";
import React from "react";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Web3 from "web3";
import axios from "axios";

import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {
  WagmiConfig,
  createClient,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, bsc } from "wagmi/chains";
import RainbowConnect from "./RainbowConnect";
import Phantom from "./Phantom";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { CheckIcon } from "@heroicons/react/20/solid";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, bsc],
  [publicProvider()]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains }),
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);
// Set up client wagmi
const client = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function Addmoney() {
  const apiu = process.env.REACT_APP_HAPI;
  const napi = process.env.REACT_APP_NAPI;
  const token = sessionStorage.getItem("item_key");
  // console.log(token)
  const { isConnected, address } = useAccount();
  const [transactionFailed, setTransactionFailed] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(true);

  // console.log(isConnected);
  const [value, setValue] = useState(10);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [expiration, setExpiration] = useState("hey");
  const [paymentId, setPaymentId] = useState(undefined);
  const [metamaskError, setError] = useState(0);

  const [transactionId, setTransactionId] = useState("");
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  //conditional
  const [handleQr, setHandleQr] = useState(false);

  const [handleInitiateTransaction, sethandleInitiateTransaction] =
    useState(false);
 
  const mark = [
    {
      value: 10,
      label: "$ 10,000",
    },
    {
      value: 80000,
      label: "$ 80,000",
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value);
    setValue(inputValue);
  };

  // not of our use for now
  const [code, setCode] = useState("");
 
  useEffect(() => {
    let intervalId = null;
   
    if (countdownStarted) {
      intervalId = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
        //the function to call the api at every second
      
        if (paymentId === undefined) {
          showCharge();
        } else {
          setTransactionSuccess(false)
          const status = "success";
         
          updatecryptotransactionstatus(status);
        }
      }, 1000);
    }

    const cancelChargeIntervalId = setInterval(() => {
      if (countdownStarted && paymentId === undefined) {
        cancelCharge();
        setTransactionFailed(false)
        const status = "failed";
          updatecryptotransactionstatus(status);
      }
    }, 600000);
    return () => {
      clearInterval(intervalId);
      clearInterval(cancelChargeIntervalId);
    };
  }, [code, countdownStarted, expiration, paymentId, transactionId]);
  
// useEffect(() => {
//   let cancelChargeIntervalId = null;

//   if (countdownStarted && !hasRunRef.current && !paymentId) {
//     cancelChargeIntervalId = setInterval(() => {
//       console.log("about to cancel charge");
//       const status = "failed";
//       //   updatecryptotransactionstatus(status);
//       cancelCharge();
//     }, 10000);

//     hasRunRef.current = true;
//   }

//   return () => {
//     clearInterval(cancelChargeIntervalId);
//   };
// }, [countdownStarted, paymentId, code]);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const handleStartClick = () => {
    setCountdownStarted(true);
  };
  let data = JSON.stringify({
    local_price: {
      // "amount": `${value}`,
      amount: `${value}`,
      currency: "USD",
    },
    pricing_type: "fixed_price",
  });
 
  
  const createwallettransaction = (data_code) => {
    var bodyFormData = new FormData();
    bodyFormData.append("charge_code", data_code);
    bodyFormData.append("amount", value);
    
    axios({
      method: "POST",
      url: `${apiu}/transactions/createcryptotransaction`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
      
        
        setTransactionId(response.data.transaction_id);
      
      })
      .catch((error) => {});
  };

  const updatecryptotransactionstatus = (status_p) => {
    var bodyFormData = new FormData();
    bodyFormData.append("transaction_id", transactionId);
    bodyFormData.append("status", status_p);
    bodyFormData.append("charge_code", code);

    // bodyFormData.append('status', status);
    // bodyFormData.append('charge_code', code);

    axios({
      method: "POST",
      url: `${apiu}/transactions/updatecryptotransactionstatus`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {});
  };

  const coinbaseCharge = (event) => {
    sethandleInitiateTransaction(true);
    setHandleQr(true);
    handleStartClick();

    // console.log("coinbaseCharge");
    axios({
      method: "POST",
      url: "https://api.commerce.coinbase.com/charges",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CC-Version": "2018-03-22",
        "X-CC-Api-Key": "92e07dba-5af5-4241-b69d-95fa24af1856",
      },
      data: data,
    })
      .then((response) => {
        // console.log(response.data.data.code);
        window.open(response.data.data.hosted_url, "_blank");
        // coinbaseapi(response.data.data.code);
        // window.location.href = response.data.data.hosted_url;
        // setLink(response.data.data.hosted_url)
        setCode(response.data.data.code);
        createwallettransaction(response.data.data.code)
      })
      .catch();
  };
  const showCharge = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.commerce.coinbase.com/charges/${code}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CC-Version": "2018-03-22",
      },
    };

    axios(config)
      .then((response) => {
        // console.log(response.data.data.payments[0]);
        setPaymentId(response.data.data.payments[0]);
        // console.log("running show charge")
        // console.log(response.data.data.payments[0]);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const cancelCharge = async () => {
    // console.log(code);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.commerce.coinbase.com/charges/${code}/cancel`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CC-Version": "2018-03-22",
      },
    };
    axios(config)
      .then((response) => {
        // console.log(response.data.data.expires_at);
        setExpiration(response.data.data.expires_at);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // const { chains, provider, webSocketProvider } = configureChains(
  //     [mainnet, polygon, bsc],
  //     [publicProvider()],
  // )
  // const connectors = connectorsForWallets([
  //     {
  //       groupName: 'Recommended',
  //       wallets: [
  //         metaMaskWallet({ chains }),
  //         coinbaseWallet({ chains }),
  //         walletConnectWallet({ chains }),
  //         trustWallet({ chains }),

  //       ],

  //     },
  // ]);
  //   // Set up client wagmi
  // const client = createClient({
  //     autoConnect: false,
  //     connectors,
  //     provider
  // })
  const [currentChainId, setCurrentChainId] = useState(null);
  const [rainbowTimer, setRainbowTimer] = useState(false);
  const [rainbowStatus, setRainbowStatus] = useState("pending");
  const [rainbowStop, setRainbowstop] = useState("true");
  // const [updateCalled, setUpdateCalled] = useState(false);


  
  const [contractAdd, setContractAdd] = useState("");
  // personal
  useEffect(() => {
    let intervalId = null;
    let isUpdateCalled = false;
    if (rainbowTimer) {
      intervalId = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
        //the function to call the api at every second
        // console.log(rainbowStatus)
        if (!isUpdateCalled && rainbowStatus !== "failed") {
       
         if(metamaskError !== 4001){
          wallettransactiononscanner()
         } else if(metamaskError === 4001){
          isUpdateCalled = true;
          setTransactionFailed(false)
          cancelrainbowwallettransactionstatus();    
         }
        } else if(rainbowStatus === "true"){
          setTransactionSuccess(false)
            // console.log("success")
        }
      }, 1000 );
    }
    const cancelChargeIntervalId = setInterval(() => {
      if (rainbowTimer) {
        setTransactionFailed(false);
        isUpdateCalled = true;
        cancelrainbowwallettransactionstatus();
      }
    }, 600000);
    return () => {
      clearInterval(intervalId);
      clearInterval(cancelChargeIntervalId);
    };
  }, [code, rainbowTimer, expiration, transactionId, metamaskError]);
  useEffect(() => {
    const getCurrentChainId = async () => {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setCurrentChainId(chainId);
        if (chainId === "0x1") {
          setContractAdd("0xdac17f958d2ee523a2206206994597c13d831ec7"); // replace with your contract address for mainnet
        } else if (chainId === "0x89") {
          setContractAdd("0xc2132D05D31c914a87C6611C10748AEb04B58e8F"); // replace with your contract address for Ropsten
        } else if (chainId === "0x39") {
          setContractAdd("0x55d398326f99059ff775485246999027b3197955"); // replace with your contract address for Goerli
        }
      } catch (err) {
        console.error(err);
      }
    };

    getCurrentChainId();

    // Listen for chain change events
    window.ethereum.on("chainChanged", handleChainChanged);

    // Remove the listener when the component unmounts
    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);
  const handleChainChanged = (chainId) => {
    setCurrentChainId(chainId);
    if (chainId === "0x1") {
      setContractAdd("0xdac17f958d2ee523a2206206994597c13d831ec7"); // replace with your contract address for mainnet
    } else if (chainId === "0x89") {
      setContractAdd("0xc2132D05D31c914a87C6611C10748AEb04B58e8F"); // replace with your contract address for Ropsten
    } else if (chainId === "0x38") {
      setContractAdd("0x55d398326f99059ff775485246999027b3197955"); // replace with your contract address for Goerli
    } else {
      setContractAdd("");
    }
  };
  const payLink = async () => {
    setHandleQr(true);
    sethandleInitiateTransaction(true);
    rainbow_createwallettransaction();
    setRainbowTimer(true)
    const receiver = "0xaaa7777D2d97aFC3329728a81e62a77EE866A08C";
    const sender = address;
    const web3 = new Web3(window.ethereum);
    // console.log(web3.eth.accounts.wallet);
    var minABI = [
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    // var contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const usdt_contract = await new web3.eth.Contract(minABI, contractAdd);
    usdt_contract.methods
      .balanceOf(sender)
      .call()
      .then(function (result) {
        // console.log(result);
      });
    const ammount = web3.utils.toWei(`${value}`, "mwei");
    // console.log(ammount);
    usdt_contract.methods
      .transfer(receiver, ammount)
      .send({
        from: sender,
      })
      .then(function (result) {
        // console.log(result);
        // console.log(result["transactionHash"]);
      })
      .catch(function (err) {
     
        setError(err.code)
       
      });
  };

  const [stepOne, setStepone] = useState("complete");
  const [stepTwo, setStepTwo] = useState("current");
  const [stepThree, setStepThree] = useState("upcoming");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const initsteps = [
      { name: "Transaction Initiated", href: "#", status: stepOne },
      { name: "Verifying on Blockchain", href: "#", status: stepTwo },
      { name: "Transaction Complete", href: "#", status: stepThree },
    ];
    setSteps(initsteps);
  }, [stepOne, stepTwo, stepThree]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  // rainbow functions
  const rainbow_createwallettransaction = () => {
    var bodyFormData = new FormData();
  
    bodyFormData.append("amount", value);
  
      if (currentChainId === "0x1") {
        bodyFormData.append("block_chain", "ETH");
      } else if (currentChainId === "0x89") {
        bodyFormData.append("block_chain", "POLYGON");
      } else if (currentChainId === "0x39") {
        bodyFormData.append("block_chain", "BSC");
      }
      bodyFormData.append("wallet_address", address);
    
    axios({
      method: "POST",
      url: `${apiu}/transactions/createwallettransaction`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response.data.transaction_id);
        setTransactionId(response.data.transaction_id);
      })
      .catch((error) => {});
  };
  
  const wallettransactiononscanner = () => {
    var bodyFormData = new FormData();
  
    bodyFormData.append("transaction_id", transactionId);

    
    axios({
      method: "POST",
      url: `${apiu}/transactions/wallettransactiononscanner`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response.data.status);
        if(response.data.status === false){
          // console.log("hey")
        }
        // setRainbowStatus("failed");
      })
      .catch((error) => {});
  };
  const cancelrainbowwallettransactionstatus = () => {
  
    var bodyFormData = new FormData();
   
    bodyFormData.append("transaction_id", transactionId);
    bodyFormData.append("status", "failed");
    bodyFormData.append("transaction_hash", " ");
    
    axios({
      method: "POST",
      url: `${apiu}/transactions/updatewallettransactionstatus`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
       
        // console.log(response);
        
      })
      .catch((error) => {});
  };
  const successrainbowwallettransactionstatus = () => {
  
    var bodyFormData = new FormData();
   
    bodyFormData.append("transaction_id", transactionId);
    bodyFormData.append("status", "success");
    bodyFormData.append("transaction_hash", " ");
    
    axios({
      method: "POST",
      url: `${apiu}/transactions/updatewallettransactionstatus`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
       
        // console.log(response);
        
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Navbar />
          <header className="py-10">
            <div className="mx-auto max-w-6xl px-4 md:px-0 lg:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Add Money
              </h1>
            </div>
          </header>
        </div>
      </div>
      <main className="-mt-32">
        <div className="items-center overflow-hidden rounded-lg bg-white shadow mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <br></br>
          <div className="mt-6 text-center text-xl font-extrabold text-gray-900">
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
                    min={10}
                    max={80000}
                    marks={mark}
                    valueLabelDisplay="auto"
                    onChange={handleSliderChange}
                  />
                </Box>
              </Typography>
            </div>

            {/* </Modal> */}
          </div>
         {/* transaction initiate component */}
          {handleInitiateTransaction && transactionFailed && transactionSuccess &&(
            <div id="transactionpending" className=" container max-w-xl">
              {handleQr && (
                <div className="absolute top-0 right-1 z-10">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
              )}
              <div className="columns-1">
                <div className="h-96 bg-sky-50 shadow-sm rounded-md items-center text-center text-gray-800 font-light">
                  <div className="ml-32 sm:ml-16 items-center text-center">
                    <br></br>
                    <br></br>
                    <nav
                      className="items-center text-center"
                      aria-label="Progress"
                    >
                      <ol role="list" className="flex items-center">
                        {steps.map((step, stepIdx) => (
                          <li
                            key={step.name}
                            className={classNames(
                              stepIdx !== steps.length - 1
                                ? "pr-16 sm:pr-32 md:pr-44"
                                : "",
                              "relative"
                            )}
                          >
                            {step.status === "complete" ? (
                              <>
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="h-0.5 w-full bg-indigo-600" />
                                </div>
                                {/* <br></br><br></br> */}
                                <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
                                  <br></br>
                                  <CheckIcon
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">{step.name}</span>
                                </a>
                                {/* <br></br>
                                            <div className="w-22 break-all">{step.name}</div> */}
                              </>
                            ) : step.status === "current" ? (
                              <>
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                {/* <br></br><br></br> */}
                                <a
                                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                                  aria-current="step"
                                >
                                  <br></br>
                                  <span
                                    className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">{step.name}</span>
                                </a>
                                {/* <br></br>
                                            <div className="w-22 break-all">{step.name}</div> */}
                              </>
                            ) : (
                              <>
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                {/* <br></br><br></br> */}
                                <a className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                                  <br></br>
                                  <span
                                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">{step.name}</span>
                                </a>
                                {/* <br></br>
                                            <div className="w-22 break-all">{step.name}</div> */}
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>
                  <br></br>
                  <div className="columns-3 items-center">
                    <div className="text-center">
                      Transaction<br></br>Initiated
                    </div>
                    <div className="text-center">
                      Verifying on<br></br>blockchain
                    </div>
                    <div className="text-centre">
                      Transaction<br></br>Complete
                    </div>
                  </div>
                  <div className="text-center items-center mt-12 ml-56 sm:ml-72">
                    <div className="dot-flashing"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <br></br>
          {/* switch network component */}
          {isConnected && !handleInitiateTransaction && transactionFailed &&  transactionSuccess &&(
            <div id="switchnetwork" className=" container max-w-xl">
              <div className="columns-1">
                <div className="h-96 bg-sky-50 shadow-sm rounded-md items-center text-center text-gray-800 font-light">
                  {" "}
                  &nbsp;
                  <div className="">Switch Network</div>
                  <div className="text-center items-center w-full mr-0 sm:px-12">
                    <WagmiConfig client={client}>
                      <RainbowKitProvider
                        showRecentTransactions={true}
                        chains={chains}
                      >
                        <RainbowConnect />
                      </RainbowKitProvider>
                    </WagmiConfig>
                  </div>
                  <br></br>
                  <div className="text-center items-center">
                    <button
                      onClick={payLink}
                      className="inline-flex justify-center rounded-xl border border-transparent bg-blue-500 py-2.5 px-4 text-sm font-xl font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >

                      Initiate Transaction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <br></br>
          {/* Wallet And coinbase connect component */}
          {!handleQr && !isConnected && transactionFailed &&  transactionSuccess && (
            <div id="paymentbuttons" className="container max-w-xl">
              <div className="columns-2">
                <div className="h-96 bg-sky-50 shadow-sm rounded-md text-center text-gray-800 font-light">
                  {" "}
                  &nbsp;
                  <div className="">
                    Pay by connecting<br></br> web3 wallets
                  </div>
                  <br></br>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Ethereum
                    </span>
                    &nbsp;
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Binance
                    </span>
                    &nbsp;
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Polygon
                    </span>
                  </div>
                  <div className="text-center items-center px-2 md:px-8 lg:px-8">
                    <WagmiConfig client={client}>
                      <RainbowKitProvider
                        showRecentTransactions={true}
                        chains={chains}
                      >
                        <RainbowConnect />
                      </RainbowKitProvider>
                    </WagmiConfig>
                  </div>
                  <div>
                    <span className="hidden inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      solana
                    </span>
                  </div>
                  <div className="hidden text-center items-center px-2 md:px-8 lg:px-8 pt-4">
                    <button className="inline-flex justify-center rounded-xl border border-transparent bg-blue-500 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Connect Phantom
                    </button>
                  </div>
                </div>

                <div className="h-96 bg-sky-50 shadow-sm rounded-md text-center text-gray-800 font-light">
                  {" "}
                  &nbsp;
                  <div className="">
                    Pay by QR code or<br></br> Address Transfer{" "}
                  </div>
                  <br></br>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Ethereum
                    </span>
                    &nbsp;
                    {/* <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                Binance
                            </span>
                            &nbsp;
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                Polygon
                            </span> */}
                  </div>
                  <br></br>
                  <div className="text-center items-center px-2 md:px-8 lg:px-8">
                    <button
                      onClick={coinbaseCharge}
                      className="inline-flex justify-center rounded-xl border border-transparent bg-blue-500 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Pay with QR
                    </button>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          )}
           {/* //failed transaction component */}
           { !transactionFailed && transactionSuccess && (
            <div id="transactionpending" className=" container mt-2 max-w-xl">
              <div className="columns-1">
                <div className="h-96 bg-sky-50 shadow-sm rounded-md items-center text-center text-gray-800 font-light">
                  <div className="ml-32 sm:ml-16 items-center text-center">
                    <br></br>
                    <br></br>
                  </div>
                  <br></br>
                  <div className="columns-3 items-center">
                    <div className="text-center ">
                        &nbsp;
                    </div>
                    <div className="text-center ">
                     Transaction<br></br>Failed
                    </div>
                    <div className="text-centre hidden">
                    &nbsp;
                    </div>
                  </div>
                  <div className="text-center items-center mt-12 ml-56 sm:ml-64">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red-500" className="fill-red-500 w-16 h-16">
  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>

                  </div>
                  <div className="text-center items-center mt-12 ml-4">
                   <a href="/dashboard"
                      className="inline-flex justify-center rounded-xl border border-transparent bg-blue-500 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Return to Dashboard
                    </a>
                    </div>
                </div>
              </div>
            </div>
          )}
          <br></br>
          {/* //failed transaction component ended */}
               {/* //success transaction component */}
               { !transactionSuccess && (
            <div id="transactionpending" className=" container mt-2 max-w-xl">
              <div className="columns-1">
                <div className="h-96 bg-sky-50 shadow-sm rounded-md items-center text-center text-gray-800 font-light">
                  <div className="ml-32 sm:ml-16 items-center text-center">
                    <br></br>
                    <br></br>
                  </div>
                  <br></br>
                  <div className="columns-3 items-center">
                    <div className="text-center ">
                        &nbsp;
                    </div>
                    <div className="text-center ">
                     Transaction<br></br>Success
                    </div>
                    <div className="text-centre hidden">
                    &nbsp;
                    </div>
                  </div>
                  <div className="text-center items-center mt-12 ml-56 sm:ml-64">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-green-500 w-16 h-16">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
</svg>



                  </div>
                  <div className="text-center items-center mt-12 ml-4">
                   <a href="/dashboard"
                      className="inline-flex justify-center rounded-xl border border-transparent bg-blue-500 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Return to Dashboard
                    </a>
                    </div>
                </div>
              </div>
            </div>
          )}
          <br></br>
          {/* //success transaction component ended */}
        </div>
      </main>
    </>
  );
}

export default Addmoney;