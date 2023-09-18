import React, { useEffect, useState } from 'react'
// import * as solanaWeb3 from '@solana/web3.js';
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
const Phantom = () => {
    //    // console.log(solanaWeb3 );
    const [walletAddress, setWalletAddress] = useState(null);
    const [pubKey, setPubKey] = useState(null);
    const connection = new Connection('https://api.devnet.solana.com/', 'confirmed');
    const disconnect = async () => {
        const getProvider = () => {
            if ('phantom' in window) {
                const provider = window.phantom?.solana;
                if (provider?.isPhantom) {
                    return provider;
                }
            }
        };
        const provider = getProvider(); // see "Detecting the Provider"
        provider.disconnect();
        // console.log("disconnected")
    };

    // provider.on("connect", () => // console.log("connected!"));
    const checkIfWalletIsConnected = async () => {
        if (window?.solana?.isPhantom) {
            // console.log("wallet found")
            const getProvider = () => {
                if ('phantom' in window) {
                    const provider = window.phantom?.solana;
                    if (provider?.isPhantom) {
                        return provider;
                    }
                }
                // window.open('https://phantom.app/', '_blank');
            };
            const provider = getProvider(); // see "Detecting the Provider"
            try {
                const resp = await provider.connect();
                const message = `To avoid digital dognappers, sign below to authenticate with CryptoCorgis`;
                const encodedMessage = new TextEncoder().encode(message);
                const signedMessage = await provider.signMessage(encodedMessage, "utf8");
                // console.log(resp.publicKey);
                provider.connect({ onlyIfTrusted: true })
                    .then(({ publicKey }) => {
                        // console.log(publicKey)
                    });

                // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
            } catch (err) {
                // console.log(err)
                // { code: 4001, message: 'User rejected the request.' }
            }
            // const response = await window.solana.connect({ onlyIfTrusted: true });
            // // console.log(
            //     'Connected with Public Key:',
            //     response
            // );
        } else {
            // console.log('Solana object not found! Get a Phantom Wallet 👻');
        }
    };
    const handleClick = async () => {
        try {
            const provider = window.solana;
            if (!provider) throw new Error('Phantom wallet is not installed');

            // Get the public key of the connected wallet
            const publicKey = provider.publicKey;
            // console.log(publicKey)
            if (!publicKey) throw new Error('No public key found');
            const account = "Hiz1yjG54WvSt8ZtVTJLyL81K6xjdQ3kSUpkVtdVyCiQ"
            // const { blockhash } = await connection.getRecentBlockhash();
            let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                  fromPubkey: publicKey,
                  toPubkey: account,
                  lamports: 1000000000, // Send 1 SOL
                })
              );
              transaction.recentBlockhash = blockhash;
              transaction.feePayer = publicKey;
              const { signature } = await window.solana.signAndSendTransaction(transaction);
              await connection.confirmTransaction(transaction);
              // console.log(`Transaction sent: ${signature}`);
            
        } catch (error) {
            // console.log(error)
        }

    };



    return (
        <div className="mt-16 px-8">
            <button onClick={checkIfWalletIsConnected} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">

                Connect with Phantom
            </button>
            <button onClick={disconnect} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">

                Disconnect with Phantom
            </button>
            <button onClick={handleClick} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">

                Send Transaction
            </button>
        </div>
    )
}

export default Phantom

//7ueyWYSSrnXn2mryMdvBihFv9muMTixtPnYkFGZenhQ1