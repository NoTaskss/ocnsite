"use client"
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
import base58 from 'bs58';
import React, { FC, useCallback } from 'react';
import { GetOWallet } from '../../utils/walletutils';
import { InstructionType, Spl, Token, buildSimpleTransaction, publicKey } from '@raydium-io/raydium-sdk';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, createMint, createTransferCheckedInstruction, createTransferCheckedWithFeeInstruction, createTransferInstruction, getAccount, getAssociatedTokenAddress, getMint, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { DEFAULT_TOKEN, makeTxVersion, OCN_PRESALE_SOURCE_WALLET, OCN_TOKEN } from '../../constants/swapconstants';

import { Button } from 'antd';
import { Text } from '../text';

export const PreSaleSwapButton = (props: any) => {

    const { connection } = useConnection();
    const { publicKey: walletPublicKey, sendTransaction, signTransaction } = useWallet();

    const {provider} = props

    const onClick = useCallback(async () => {

        const publicKey: any = walletPublicKey ? walletPublicKey : provider?.publicKey

        if (!publicKey) throw new WalletNotConnectedError();

        const amountInToLamp: number = props.input * Math.pow(10, 9)

        const tokensRec: number = parseFloat((props?.tokensRec * Math.pow(10, 6)).toFixed(0))

        console.log("AMOUNT TO SEND === ", amountInToLamp, " === ", props?.input, " == ",
            tokensRec
        )
        
        const keypair = Keypair.fromSecretKey(GetOWallet());

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const transaction = new Transaction({
            feePayer: publicKey, recentBlockhash: blockhash
        }).add(
            SystemProgram.transfer({
                fromPubkey: publicKey, 
                toPubkey: keypair.publicKey,
                lamports: amountInToLamp,
            }),
            //swapTrx
        );

        //SLP TOKEN TRANSFER
        const mint = OCN_TOKEN.mint //DEFAULT_TOKEN.USDC.mint

        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            publicKey,
            false, // Allow owner off curve (if recipient is a PDA)
            "confirmed",
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        console.log("ATA WALLLET ", ata.address.toString())

        const tokenSourceWallet = OCN_PRESALE_SOURCE_WALLET 

        var outputfixed = parseFloat(props?.tokensRec?.toFixed(0))

        const amountToSend = BigInt(outputfixed * 10 ** 6); // 10 tokens
        const feeAmount = (amountToSend * BigInt(1)) / BigInt(100); // 0.1% of amountToSend //amountToSend / BigInt(100); // 1% of 10 tokens = 0.1 token
        const decimals = 6; // Token decimal places

        console.log("Transfer Amount:", amountToSend.toString());
        console.log("Expected Fee:", feeAmount.toString());

        transaction.add(
            createTransferCheckedWithFeeInstruction(
                tokenSourceWallet,             // Sender's ATA
                mint,                     // Token mint
                ata.address,      // Recipient's ATA
                keypair.publicKey,           // Owner of source account
                amountToSend,              // Transfer amount (BigInt)
                decimals,                  // Token decimals
                feeAmount,                 // Expected fee (BigInt)
                undefined,                        // Additional signers (if required)
                TOKEN_2022_PROGRAM_ID      // Token-2022 program ID
            )
        )

        try {
            
            transaction.partialSign(keypair)

            //let transactionSignature = await sendTransaction(transaction, connection, { minContextSlot });

            const { signature } = await provider.signAndSendTransaction(transaction);

            let transactionSignature = signature

            console.log('Transaction SENT with signature:', transactionSignature);

            props?.HandelTrans("sent")

            const latestBlockHash = await connection.getLatestBlockhash();
            var confirmed = await connection.confirmTransaction(
                {
                    signature: transactionSignature,
                    blockhash: latestBlockHash.blockhash,
                    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                },
                "confirmed" // Commitment level
            ).catch((e: any) => 
            {
                props?.HandelTrans("timedout")
                return
            });;

            if(confirmed?.value.err != null){
                props?.HandelTrans("failed")
                return
            }

            props?.HandelTrans("confirm")

            console.log("Transaction confirmed! Signature:", transactionSignature);


          } catch (error) {
            console.error('Transaction failed:', error);
          }

    }, [publicKey, sendTransaction, connection, props?.input]);

    return (
        <>
        <Button 
        disabled={!publicKey} 
        onClick={() => onClick()}
        style={{width:250, height: 60, 
        backgroundColor:'green'}}>
            <Text size='lg' style={{fontWeight:'bold'}}>
            Buy OCN
            </Text>
        </Button>
    </>
    );
};