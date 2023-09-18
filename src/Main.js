// //Used
// import { WagmiConfig, createClient, configureChains, useAccount,  useConnect, useDisconnect } from 'wagmi'
// import React, { useState, useEffect } from 'react';
// import { publicProvider } from 'wagmi/providers/public'
// import * as buffer from "buffer";
// import Web3 from 'web3';
// import { trustWallet } from '@rainbow-me/rainbowkit/wallets';
// import Phantom from './Phantom'
// import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai, bsc } from 'wagmi/chains';
// import { connectorsForWallets } from '@rainbow-me/rainbowkit';
// import {
//   injectedWallet,
//   rainbowWallet,
//   walletConnectWallet,
//   metaMaskWallet,
//   coinbaseWallet,
// } from '@rainbow-me/rainbowkit/wallets';
// import RainbowConnect from './RainbowConnect'
// import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
// import axios from 'axios'
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Coinbase from './Coinbase';
// import { LogoutGoogle } from './LogoutGoogle';
// import { LoginGoogle } from './LoginGoogle';
// import { gapi } from 'gapi-script';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
// import AuthProfile from './AuthProfile';
// import { useAuth0 } from "@auth0/auth0-react";

// //Buffer Bug Fix
// window.Buffer = buffer.Buffer;

// // Modal Css
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// // Variable to support chains on rainbow wallet
// const tron = {
//   id: 195,
//   name: 'Tron',
//   network: 'tron',
//   nativeCurrency: {
//     decimals: 6,
//     name: 'TRON',
//     symbol: 'TRX',
//   },
//   rpcUrls: {
//     public: { http: ['https://api.trongrid.io'] },
//     default: { http: ['https://api.trongrid.io'] },
//   },
//   blockExplorers: {
//     tronscan: { name: 'TRONSCAN', url: 'https://tronscan.org' },
//     default: { name: 'TRONSCAN', url: 'https://tronscan.org' },
//   },

//   // contracts: {
//   //   multicall: {
//   //     address: '0x8C5fecdC472E27Bc447696F431E425D02dd46a8c',
//   //     blockCreated: 9_775_600,
//   //   },
//   // },
// };

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet, polygon, bsc, tron],
//   [publicProvider()],
// )
// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       metaMaskWallet({ chains }),
//       coinbaseWallet({ chains }),
//       walletConnectWallet({ chains }),
//       trustWallet({ chains }),

//     ],

//   },
// ]);
// // Set up client wagmi
// const client = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// })
// const clientID = "176030128280-qdbpbr5vfsr2bnnul33k1ar9fk9krl7n.apps.googleusercontent.com"

// function Main() {
//   const { error } = useAuth0();
  
//   useEffect(() =>{
//     function start(){gapi.client.init({
//       clientId: clientID,
//       scope: ""
//     })
//   };
//   gapi.load('client:auth2', start);
// });

//   // const { isConnected } = useAccount()
//   //iframe
//   const [showSearch, setShowSearch] = useState(false);
//   const handleButtonClick = () => {
//     setShowSearch(true);
//   };
//   const searchSrc = 'https://www.google.com/search?q=react'; // replace with your own Google search URL

//   //slider 
//   const [value, setValue] = useState(10);
//   const mark = [
//     {
//       value: 10,
//       label: "start"
//     },
//     {
//       value: 40000,
//       label: "middle"
//     },
//     {
//       value: 80000,
//       label: "end"
//     }
//   ]
//   const [open, setOpen] = useState(false)
//   const handleOpenSlider = () => {
//     setOpen(true)
//   }
//   const handleCloseSlider = () => {
//     setOpen(false)
//   }
//   const getValue = (e, val) => {
//     setValue(val)

//   }

//   //variables to store link and charge code of coinbase transaction respectively 
//   const [link, setLink] = useState('');
//   const [code, setCode] = useState("")

//   //Coinbase Functions

//   let data = JSON.stringify({
//     "local_price": {
//       "amount": `${value}`,
//       "currency": "USD"
//     },
//     "pricing_type": "fixed_price"
//   });

//   // function to create coinbase charge
//   const coinbaseCharge = (event) => {
//     console.log("coinbaseCharge")
//     axios(
//       {
//         method: 'POST',
//         url: 'https://api.commerce.coinbase.com/charges',

//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'X-CC-Version': '2018-03-22',
//           'X-CC-Api-Key': '92e07dba-5af5-4241-b69d-95fa24af1856'
//         },
//         data: data
//       }

//     )
//       .then((response) => {
//         console.log(response.data.data.code);
//         window.open(response.data.data.hosted_url, '_blank')
//         // window.location.href = response.data.data.hosted_url;
//         setLink(response.data.data.hosted_url)
//         setCode(response.data.data.code)
//       })
//       .catch()
//   };
//   // coinbase showcharge function to show timeline of charges
//   const showCharge = async () => {
//     let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: `https://api.commerce.coinbase.com/charges/${code}`,
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-CC-Version': '2018-03-22'
//       }
//     };

//     axios(config)
//       .then((response) => {
//         console.log(response.data.data.timeline[0]);
//       })
//       .catch((error) => {
//         // console.log(error);
//       });
//   }
//   // showCharge();
//   // setInterval(showCharge, 1000);

//   // Coinbase function to cancel a charge
//   const cancelCharge = async () => {
//     console.log(code)
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `https://api.commerce.coinbase.com/charges/${code}/cancel`,
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-CC-Version': '2018-03-22'
//       }
//     };
//     axios(config)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   // cancelCharge()
//   // setInterval(cancelCharge, 10000);

//   const { address, isConnected } = useAccount();

//   // function to send metamask, trust etc transactions
//   const payLink = async () => {
//     const receiver = "0xaaa7777D2d97aFC3329728a81e62a77EE866A08C";
//     // const sender = "0xd0Fe02b36CCF865C80EB3a8cF1Ab837BA627427E";
//     const sender = address;
//     const web3 = new Web3(window.ethereum);
//     console.log(web3.eth.accounts.wallet);
//     var minABI = [
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "name": "_to",
//             "type": "address"
//           },
//           {
//             "name": "_value",
//             "type": "uint256"
//           }
//         ],
//         "name": "transfer",
//         "outputs": [
//           {
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [
//           {
//             "name": "_owner",
//             "type": "address"
//           }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//           {
//             "name": "balance",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//     ];
//     // var contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
//     var contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
//     const usdt_contract = await new web3.eth.Contract(minABI, contractAddress);
//     usdt_contract.methods.balanceOf(sender).call().then(function (result) {
//       console.log(result);
//     });
//     const ammount = web3.utils.toWei(`${value}`, 'mwei');
//     console.log(ammount);
//     usdt_contract.methods.transfer(receiver, ammount).send({
//       from: sender
//     }).then(function (result) {
//       console.log(result);
//       console.log(result["transactionHash"]);
//     }
//     ).catch(function (err) {
//       console.log("error found");
//       console.log(err);
//     }
//     );
//   }
//   return (
//     <>
//   <LoginButton/>
    
//     <AuthProfile/>

//     <WagmiConfig client={client}>
//       {/* <Phantom /> */}
//       <RainbowKitProvider showRecentTransactions={true} chains={chains}>
//         <RainbowConnect />
//       </RainbowKitProvider>
//       </WagmiConfig>
//       {/* Coinbase */}
//       <div className='p-4'>
//         <button type="button" onClick={coinbaseCharge} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Coinbase</button>
//       </div>

//       {/* Metamask */}
//       <div className='p-4'>
//         <button onClick={payLink} className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Metamask</button>
//       </div>
      
   
//       {/* slider button */}
//       <div className='p-4'>
//         <Button onClick={handleOpenSlider} sx={{ border: '1px solid green', borderRadius: 1 }}>Amount Select</Button>
//         {/* <Button onClick={handleOpen2}>Open modal2</Button> */}
//         <Modal
//           open={open}
//           onClose={handleCloseSlider}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography component={'span'} id="modal-modal-title" variant="h6" >
//               Slider C3links
//             </Typography>
//             <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
//               <Box width={300}>

//                 {/* <Slider defaultValue={10} aria-label="Default" valueLabelDisplay="auto" /> */}
//                 <Slider color='secondary' defaultValue={50} min={10} max={80000} marks={mark} valueLabelDisplay="auto" onChange={getValue}></Slider>
//               </Box>
//               <h1>{value}</h1>
//               <Button onClick={handleCloseSlider}>Close modal</Button>

//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//       <div>
//         <LoginGoogle/>
//         <LogoutGoogle/>
//       </div>
//             </>
//     )
// }

// export default Main;

// //  https://commerce.coinbase.com/checkout/96522528-bab3-4737-8a70-c415df2e021d