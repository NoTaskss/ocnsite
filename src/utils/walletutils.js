import {PublicKey, Connection, clusterApiUrl} from '@solana/web3.js';
import { connection } from '../constants/swapconstants';
import base58 from 'bs58';

export function GetOWallet(short) {
    const privateKeyString = process.env.NEXT_PUBLIC_LIQ_Wallet_Key
    const secretKey = base58.decode(privateKeyString) //short ? base58.decode(privateKeyString) : privateKeyString;
    return secretKey
}

export async function GetTokenBalance(mintAd, walletAd, connection){
    //const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    
    try{
        if(!connection){
            console.error("ERROE WITH CONNECTION ")
            return {tokenBalance: 0, displayString: "0"}
        }
        // // Replace with the public key of the wallet you're checking
        // const walletAddress = new PublicKey('2ZZv7pamd7S4crcFvcfagpRTibY4eoXra6bGYxuZSCdt');

        // console.log("GETTING BALLLLLLLL ", mintAd)
        // Replace with the mint address of the token you're interested in
        const tokenMintAddress = new PublicKey(mintAd);

        // Fetch all token accounts for the wallet
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAd, {
            mint: tokenMintAddress,
        });

        //console.log("TOKENS ", tokenAccounts)

        if (tokenAccounts.value.length === 0) {
            console.log('No token accounts found for the specified token.');
            return {tokenBalance: 0, displayString: "0"}
        }

        // Assuming the first account is the one we're interested in
        const accountInfo = tokenAccounts.value[0].account.data.parsed.info;
        const tokenBalance = accountInfo.tokenAmount.amount

        const displayString = accountInfo.tokenAmount.uiAmount


        return {tokenBalance, displayString}
    }catch (error) {
        console.error("Error Geting User Token Balance:", error);

        return {tokenBalance: 0, displayString: "0"}
    }

    //console.log(`Token balance: ${tokenBalance}`);
}

export async function GetSolBalance(walletAd, connection){
    console.log("GETTING WALLET ", walletAd)
    //const connection = new Connection(clusterApiUrl("mainnet-beta"), 'confirmed');
    let balance = await connection.getBalance(new PublicKey(walletAd));
    const lamports = balance;
    const sol = lamports / 1000000000;
    return sol
}

export async function getTransactions (address, numTx) {
    const pubKey = new PublicKey(address);
    let transactionList = await connection.getSignaturesForAddress(pubKey, {limit:numTx});
    // transactionList.forEach((transaction, i) => {
    //     const date = new Date(transaction.blockTime*1000);
    //     console.log(`Transaction No: ${i+1}`);
    //     console.log(`Signature: ${transaction.signature}`);
    //     console.log(`Time: ${date}`);
    //     console.log(`Status: ${transaction.confirmationStatus}`);
    //     console.log(("-").repeat(20));
    // })

    return transactionList
}




