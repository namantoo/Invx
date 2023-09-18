import { useEffect, useState } from "react";
import React from "react";
import Navbar from "./Navbar";
import "flowbite/dist/flowbite.min.css";
import Apiurl from "./apiurl";
import axios from "axios";
import Button from "@mui/material/Button";
import Web3 from "web3";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  WagmiConfig,
  createClient,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";


import { publicProvider } from "wagmi/providers/public";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { avalanche } from "./customchain.tsx";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  bsc
} from "wagmi/chains";


import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
// import RainbowConnect from "./Rainbonp,wConnect";
import RainbowConnect from "./RainbowConnect";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Addmoney() {
  const apiu = Apiurl();
  const [currentChainId, setCurrentChainId] = useState(null);
  const [contractAdd, setContractAdd] = useState("");
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
  // console.log(currentChainId)
  // if(currentChainId === "0x1"){
  //   setContractAdd("0xdac17f958d2ee523a2206206994597c13d831ec7")
  // }  if(currentChainId === "0x89"){
  //   setContractAdd("0xc2132D05D31c914a87C6611C10748AEb04B58e8F")
  // }
  // if(currentChainId === "0x39"){
  //   setContractAdd("0x55d398326f99059ff775485246999027b3197955")
  // }
  console.log(contractAdd);
  // const { address, isConnected } = useAccount()
  //   let sender = null;
  //   if (isConnected === true){
  //     sender = address;
  //   }
  //   console.log(sender);

  //timer variables
  const [isOpen, setIsOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [expiration, setExpiration] = useState("hey");
  // const [isConnected, setIsConnected] = useState(true);

  const [paymentId, setPaymentId] = useState(undefined);

  const [rainbowConnectionStatus, setRainbowConnectionStatus] = useState("");

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
          console.log("transaction success");
        }
      }, 1000);
    }

    const cancelChargeIntervalId = setInterval(() => {
      if (paymentId === undefined) {
        cancelCharge();
      }
    }, 600000);
    return () => {
      clearInterval(intervalId);
      clearInterval(cancelChargeIntervalId);
    };
  }, [code, countdownStarted, expiration]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const handleStartClick = () => {
    setCountdownStarted(true);
  };
  const [showCoinbase, setShowCoinbase] = useState(true);

  function handleWalletClick() {
    setShowCoinbase(false);
  }
  // Variable to support chains on rainbow wallet
  const tron = {
    id: 195,
    name: 'Tron',
    network: 'tron',
    nativeCurrency: {
      decimals: 6,
      name: 'TRON',
      symbol: 'TRX',
    },
    rpcUrls: {
      public: { http: ['https://api.trongrid.io'] },
      default: { http: ['https://api.trongrid.io'] },
    },
    blockExplorers: {
      tronscan: { name: 'TRONSCAN', url: 'https://tronscan.org' },
      default: { name: 'TRONSCAN', url: 'https://tronscan.org' },
    },

    // contracts: {
    //   multicall: {
    //     address: '0x8C5fecdC472E27Bc447696F431E425D02dd46a8c',
    //     blockCreated: 9_775_600,
    //   },
    // },
  };
  
  const avalanche = {
    id: 43114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
      default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11907934,
      },
    },
  };
  
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon, bsc, tron],
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
    autoConnect: true,
    connectors,
    provider,
  });

  const { isConnected } = useAccount();
  // useEffect(() =>{
  //   console.log(isConnected)

  // },[isConnected])
  // setRainbowConnectionStatus(isConnected)
  // console.log(isConnected);
  // const { address, isConnected } = useAccount()
  //     let sender = null;
  //   if (isConnected === true){
  //     sender = address;
  //   }
  //   console.log(sender);
  console.log("hey");
  const [open, setOpen] = useState(false);
  //slider
  const [value, setValue] = useState(10);
  const mark = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 40000,
      label: "40000",
    },
    {
      value: 80000,
      label: "80000",
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value);
    // if (inputValue >= 10) {
    //   setValue(inputValue);
    // }x
    setValue(inputValue);
  };

  const handleOpenSlider = () => {
    setOpen(true);
  };
  const handleCloseSlider = () => {
    setOpen(false);
  };
  const getValue = (e, val) => {
    setValue(val);
  };
  let data = JSON.stringify({
    local_price: {
      // "amount": `${value}`,
      amount: "1",
      currency: "USD",
    },
    pricing_type: "fixed_price",
  });

  // function to create coinbase charge
  const coinbaseCharge = (event) => {
    setIsOpen(true);
    setCountdownStarted(true);

    console.log("coinbaseCharge");
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
        console.log(response.data.data.code);
        window.open(response.data.data.hosted_url, "_blank");
        coinbaseapi(response.data.data.code);
        // window.location.href = response.data.data.hosted_url;
        // setLink(response.data.data.hosted_url)
        setCode(response.data.data.code);
      })
      .catch();
  };
  const coinbaseapi = () => {
    console.log("hey");
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
        console.log(response.data.data.payments[0]);
        setPaymentId(response.data.data.payments[0]);
        // console.log(response.data.data.payments[0]);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const cancelCharge = async () => {
    console.log(code);
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
        console.log(response.data.data.expires_at);
        setExpiration(response.data.data.expires_at);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // cancelCharge()
  // setInterval(cancelCharge, 20000);
  const payLink = async () => {
    const receiver = "0xaaa7777D2d97aFC3329728a81e62a77EE866A08C";
    const sender = "0xd0Fe02b36CCF865C80EB3a8cF1Ab837BA627427E";
    const web3 = new Web3(window.ethereum);
    console.log(web3.eth.accounts.wallet);
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
    var contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const usdt_contract = await new web3.eth.Contract(minABI, contractAdd);
    usdt_contract.methods
      .balanceOf(sender)
      .call()
      .then(function (result) {
        console.log(result);
      });
    const ammount = web3.utils.toWei(`${value}`, "mwei");
    console.log(ammount);
    usdt_contract.methods
      .transfer(receiver, ammount)
      .send({
        from: sender,
      })
      .then(function (result) {
        console.log(result);
        console.log(result["transactionHash"]);
      })
      .catch(function (err) {
        console.log("error found");
        console.log(err);
      });
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
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <br></br>
          {/* <Timer/> */}
          <div className="container mx-auto py-12">
            {/* <!-- Slider button --> */}
            {/*  */}
            <div className="flex justify-center items-center mt-4">
              <h1 className="mr-16 hidden">hey</h1>
              {/* <div className="ml-16">
                {isOpen && (
                  <div>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                )}
              </div> */}
            </div>

            {/* <div className="flex justify-center items-center mt-4">
              {!showCoinbase && (
                <div className="mr-8 ">
                  <WagmiConfig client={client}>
                    <RainbowKitProvider
                      showRecentTransactions={true}
                      chains={chains}
                    >
                      <RainbowConnect />
                    </RainbowKitProvider>
                  </WagmiConfig>
                </div>
              )}
              <div className="pr-8">
                {!showCoinbase && (
                  <div>
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-16">
                      Phantom
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              {!showCoinbase && (
                <div className="p-4">
                  <button
                    onClick={payLink}
                    className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Metamask
                  </button>
                </div>
              )}
              {!showCoinbase && (
                <div className="p-4">
                  <button className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Metamask
                  </button>
                </div>
              )}
            </div> */}
            <div class=" relative flex w-9/12 h-[90vh] justify-start items-center flex-col space-x-3 shadow-md rounded-xl p-4">
              <div className="mt-6 text-center text-xl font-extrabold text-gray-900">
                Select Amount:
              </div>
              <div className="p-4 flex flex-col justify-start items-center">
                <div>
                  <Typography
                    component={"span"}
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  >
                    <Box width={300}>
                      <Slider
                        color="secondary"
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
                <div>
                  <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
                {/* </Modal> */}
              </div>
              <div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={handleWalletClick}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-16"
                  >
                    Wallets
                  </button>

                  <button
                    onClick={coinbaseCharge}
                    className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-16 ${
                      showCoinbase ? "" : "invisible"
                    }`}
                  >
                    Coinbase
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-center items-center mt-4">
                  <div>
                    <div
                      className={` ${!showCoinbase ? "" : "invisible"}`}
                      id="wallet1"
                    >
                      <WagmiConfig client={client}>
                        <RainbowKitProvider
                          showRecentTransactions={true}
                          chains={chains}
                        >
                          <RainbowConnect />
                        </RainbowKitProvider>
                      </WagmiConfig>
                    </div>
                  </div>
                  <button
                    onClick={coinbaseCharge}
                    className={`inline-flex justify-center rounded-xl border border-transparent bg-[#0E76FE] py-2.5 px-4 text-sm font-xl font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-16 ${
                      !isConnected && !showCoinbase ? "" : "invisible"
                    }`}
                  >
                    Phantom
                  </button>
                </div>
              </div>
              <div>
                <div className="flex  mt-4">
                  <button
                    onClick={payLink}
                    className={`inline-flex justify-center rounded-xl border border-transparent bg-[#0E76FE] py-2.5 px-4 text-sm font-xl font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-44 ${
                      isConnected && !showCoinbase ? "" : "invisible"
                    }`}
                  >
                    Send Transaction
                  </button>
                  <button
                    className={`inline-flex justify-center rounded-xl border border-transparent bg-[#0E76FE] py-2.5 px-4 text-sm font-xl font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-48 invisible `}
                  >
                    Phantom
                  </button>
                </div>
              </div>
              <div class="absolute top-2 right-4">
                <div className="ml-16">
                  {isOpen && (
                    <div>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </div>
                  )}
                </div>
              </div>
              <div class="absolute top-2 left-4">
                <p>back</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Addmoney;
