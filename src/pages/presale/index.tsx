"use client"
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Text } from '../../components/text';
import { Button, Flex, Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { AiOutlineWallet } from "react-icons/ai";

import { motion } from "framer-motion";
import WalletLoginCard from '../../components/smallcomps/walletlogincard';

import PreSaleSwapCard from '../../components/smallcomps/presaleswapcard';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { GetSolBalance, GetTokenBalance } from '../../utils/walletutils';

import { DEFAULT_TOKEN, OCN_PRESALE_SOURCE_WALLET, OCN_PRESALE_WALLET, OCN_TOKEN } from '../../constants/swapconstants';
import { GetPriceFromJup } from '../../utils/externalcalls';

import { IoMdArrowBack } from "react-icons/io";
import Image from 'next/image';

import nostraicon0 from '../../images/notratoken.png'

import { getProvider } from '../../utils/getProvider';
import PhantomSignInButton from '../../components/smallcomps/phantomsigninbutton';
import { PublicKey } from '@solana/web3.js';
import { useGlobalContext } from '../../contexts';

const PresalePage: NextPage = () => { 

    const [provider, setProvider] = useState<any>(null)

    const { phantomConnected, setPhantomConnected } = useGlobalContext();
   
    useEffect(() => {
        
        //return
        const isPhantomInstalled: any = window?.phantom?.solana?.isPhantom

        if(!isPhantomInstalled)
        {
            return
        }

        const provider_p = getProvider()

        setProvider(provider_p)
    
        console.log("PHANTOM IS INSTALLED ", isPhantomInstalled, " --- ", provider_p)
      }, []);

      useEffect(() => {
        if (!provider) return;

        // if(phantomConnected != provider.isConnected){
        //     setPhantomConnected(provider.isConnected)
        // }
    
        // attempt to eagerly connect
        provider.connect({ onlyIfTrusted: true }).catch(() => {
            // fail silently
            console.log("PHANTOM CONNECT FAILED SILENTLY ")
        });
    
        provider.on('connect', (publicKey: PublicKey) => {
        //   createLog({
        //     status: 'success',
        //     method: 'connect',
        //     message: `Connected to account ${publicKey.toBase58()}`,
        //   });
            console.log("PHANTOM CONNECTED - PUBLIC KEY -- ", publicKey.toString())
            setPhantomConnected(true)
        });
    
        provider.on('disconnect', () => {
        //   createLog({
        //     status: 'warning',
        //     method: 'disconnect',
        //     message: '👋',
        //   });
            console.log("PHANTOM DISCONNECTED")
            setPhantomConnected(false)
        });
    
        provider.on('accountChanged', (publicKey: PublicKey | null) => {
          if (publicKey) {
            // createLog({
            //   status: 'info',
            //   method: 'accountChanged',
            //   message: `Switched to account ${publicKey.toBase58()}`,
            // });
            console.log("PHANTOM ACCOUNT CHANGED TO ", publicKey.toString())
          } else {
            /**
             * In this case dApps could...
             *
             * 1. Not do anything
             * 2. Only re-connect to the new account if it is trusted
             *
             * ```
             * provider.connect({ onlyIfTrusted: true }).catch((err) => {
             *  // fail silently
             * });
             * ```
             *
             * 3. Always attempt to reconnect
             */
    
            // createLog({
            //   status: 'info',
            //   method: 'accountChanged',
            //   message: 'Attempting to switch accounts.',
            // });
    
            provider.connect().catch((error: any) => {
            //   createLog({
            //     status: 'error',
            //     method: 'accountChanged',
            //     message: `Failed to re-connect: ${error.message}`,
            //   });
            console.log("PHANTOM ERROR ACCOUNT CHANGED ", publicKey)
            });
          }
        });
    
        return () => {
          provider.disconnect();
        };
      }, [provider]);

    const [stepIndex, setStepIndex] = useState(0)

    const [liqInfo, setLiqInfo] = useState<any>(null)

    const [userSolBalance, setUserSolBalance] = useState(0)

    const [userTokenBalance, setUserTokenBalance] = useState<any>({tokenBalance: 0, displayString: "0", mintAd: ""})

    const { publicKey, sendTransaction, connected } = useWallet();
    const { connection } = useConnection();
    
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    function onNextStep(incrment: any){

        if(incrment){
            setStepIndex(stepIndex + 1)
        }

        if(!incrment && stepIndex > 0){
            setStepIndex(stepIndex - 1)
        }
    }

    const formatTokenPrice = (price: any) => {
        if (price < 0.000001) {
          return price.toFixed(15); 
        }
        return price.toFixed(15); // Adjust decimal places as needed
    };

    async function GetWalletLiquidity(){

        if(liqInfo){
            return
        }
    
            const mintAd = OCN_TOKEN.mint.toString()
    
            // if(!isValidPublicKey(mintAd)){
            //     return null
            // }
    
            const solB = await GetSolBalance(OCN_PRESALE_SOURCE_WALLET.toString(), connection)
    
            console.log("GET LIQ SOL BALANCE ", solB)
    
            var solUsd = await GetPriceFromJup(DEFAULT_TOKEN.WSOL.mint)
    
            console.log("SOLANA USDDD ", solUsd)
            
            console.log("GETTING LIQ BALANCE OF TOKEN ", publicKey)
    
            const {tokenBalance, displayString} = await GetTokenBalance(mintAd, OCN_PRESALE_WALLET, connection)
    
            console.log("GOT TOKEN BALANCE ", tokenBalance)
            if(mintAd == DEFAULT_TOKEN.USDC.mint.toString()){
    
                //setUserUSDCBalance(displayString)
                return
            }

            const supply = parseFloat(tokenBalance) / Math.pow(10, 6) //9
    
            const tokenPrice = (solUsd * solB) / supply;
    
            console.log("TOKEN PRICE ==== ", tokenPrice)

            var tPrice = formatTokenPrice(tokenPrice)

            var progess = parseFloat(((1 - (supply / 200000000)) * 100).toFixed(2))

            var obj = {
                tokenBalance: supply,
                displayString:displayString,
                solBalance: solB,
                solUsd: solUsd,
                tokenPriceraw: tokenPrice,
                tokenPrice: tPrice,
                presaleProgess: progess
            }
    
            console.log("WALLLET LIQQQ ==== ", obj)

            setLiqInfo(obj)

            GetUserBalances()
    
            return{
                tokenBalance:tokenBalance,
                displayString:displayString,
                solBalance: solB,
                tokenPriceraw: tokenPrice,
                tokenPrice: tPrice
            }
    }

    const GetUserSolBalance = async () => {
            
            if(!publicKey || !connected){
                return
            }
    
            console.log("GETTING SOL BAL ", publicKey, " --- ", connection)
            const solB = await GetSolBalance(publicKey?.toString(), connection)
    
            console.log("GET SOL BALANCE ", solB)
    
            setUserSolBalance(solB)
    
    }
    
    async function GetUserBalanceOfToken(mintAd: any){

        // if(!isValidPublicKey(mintAd)){
        //     return setUserTokenBalance({tokenBalance: 0, displayString: "0", mintAd:""})
        // }
        
        console.log("GETTING BALANCE OF TOKEN ", publicKey)
        const {tokenBalance, displayString} = await GetTokenBalance(mintAd, publicKey, connection)

        setUserTokenBalance({tokenBalance, displayString, mintAd})
    }

    function GetUserBalances(){

        if(!connected){
            return
        }
        GetUserSolBalance()

        GetUserBalanceOfToken(OCN_TOKEN.mint.toString())
    }

    useEffect(() => {
      
        GetWalletLiquidity()
        
        if(userSolBalance == 0){
            GetUserBalances()
        }
      return () => {
        
      }
    }, [connected])
    

    return (
        <div className={styles.maincontainer}>
            <main className={styles.presalecontainer} style={{flexDirection:"column",
            }}>
            <Steps
            style={{width:"90%", alignItems:"flex-end"}}
            items={[
            {
                title: 'How It Works',
                status: stepIndex == 0 ? "finish" : "wait",
                icon: <UserOutlined />,
            },
            {
                title: 'Connect Wallet',
                status: stepIndex == 1 ? "finish" : "wait",
                icon: <AiOutlineWallet/>, 
            },
            {
                title: 'Enter Amount',
                status:  stepIndex == 2 ? "finish" : "wait",
                icon: <SolutionOutlined />,
            },
            {
                title: 'Complete',
                status: stepIndex == 3 ? "finish" : "wait",
                icon: <SmileOutlined />,
            },
            ]}
            />
             <Flex align='center' gap={10}>
                    <Image unoptimized
                    width={80}
                    height={80}
                    objectFit='contain'
                    src={nostraicon0}
                    className={styles.logo}
                    style={{borderRadius:200}}
                    />

                    <h2 style={{fontSize:30}}>
                        $OCN
                    </h2>
                </Flex>

            {/* <h3 className={styles.tokeninfotitletext}
            style={{fontSize:20, fontFamily:"sans-serif"}}>
                DO NOT LEAVE PAGE TILL TRANSACTION IS COMPLETE
            </h3> */}

            <Button href='/'
            style={{width:110, height:40, backgroundColor:"#e84839",
                fontWeight:"600",
                position:"absolute", left:20, top: 160,
                zIndex:10, display:"flex"
            }}>
                <Flex align='center' justify='center' gap={0}>
                    <IoMdArrowBack />
                    <p style={{fontSize:12, marginBlockStart:0, marginBlockEnd:0}}>Back Home</p>
                </Flex>
                
            </Button>

            <div className={styles.presaleprogressfillbarback}>
            <div className={styles.presaleprogressfillbar}
            style={{width:`${liqInfo?.presaleProgess}%`}}/>

            <p className={styles.presaleprogresstext}>
                Presale Progress {liqInfo?.presaleProgess}%
            </p>
            
            </div>

            <p className={styles.ocnPriceText}>
                $OCN Price: ${liqInfo?.tokenPrice}
            </p>

            <p className={styles.caTitle}>
                CA: COMING SOON
            </p>

            <div className={styles.columns}
            >
            {stepIndex == 0 && 
            <motion.div
                  className={styles.presaleslide}
                  style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >
                      <h3 className={styles.tokeninfotitletext}>
                      How The Presale Works
                      </h3>

                      <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical style={{height:"100%", width:"100%", gap: 20}}>
                           
                              <div className={styles.presaleinfobox}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  Connect Your Wallet
                                  </h2>
                                  <p className={styles.presaleinfotext}>
                                  Connect Your Solana wallet such as <span style={{color:"#e84839"}}> Phantom, Solflare, or Backpack.</span> and you are ready to go.
                                  </p>
                              </div>
                              <div className={styles.presaleinfobox}>
                                <h2 className={styles.presaleboxTitletext}>
                                  How It Will Work
                                </h2>
                                  <p className={styles.presaleinfotext}>
                                    Fair Launch (Auction-Based):
                                    Deposits of SOL will determine the price per token.
                                  </p>
                              </div>
                              <div className={styles.presaleinfobox}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  Swap SOL for $OCN
                                    </h2>
                                  <p className={styles.presaleinfotext}>
                                    Connect your wallet and swap directly here, You will recieve the your tokens right away.
                                  </p>
                                  
                              </div>     
                              <div className={styles.presaleinfobox}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  Wait For Confirmation
                                    </h2>
                                  <p className={styles.presaleinfotext}>
                                   After The Transaction is complete you are now part of the $OCN community!
                                  </p>
                                  
                              </div>     
                          </Flex>        
                      </div>
                  </motion.div>
                }

            {stepIndex == 1 && 
            <motion.div
            className={styles.presaleslide}
            style={{backgroundColor:"black", display:"flex", flexDirection:"column",
            
            }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
                      <h3 className={styles.tokeninfotitletext}>
                        Connect Your Wallet
                      </h3>

                      <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical align='center' style={{height:"100%", width:"100%", gap: 40}}>
                           
                              <div className={styles.presaleinfobox}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  Connect Your Wallet
                                  </h2>
                                  <p className={styles.presaleinfotext}>
                                  Connect Your Solana wallet such as <span style={{color:"#e84839"}}> Phantom, Solflare, or Backpack.</span> and you are ready to go.
                                  </p>
                              </div>
                            
                            {/* <WalletLoginCard/> */}

                            <PhantomSignInButton
                            provider={provider}
                            />

                          </Flex>        
                      </div>
                  </motion.div>
                }


                {stepIndex == 2 && 
                <motion.div
                className={styles.presaleslide}
                style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                
                }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                >
                    <h3 className={styles.tokeninfotitletext}>
                    Swap For $OCN
                    </h3>

                    <div className={styles.tokeninforows} style={{marginTop: 20,
                    width:"90%"
                    }}>
                          
                          <Flex vertical align='center' style={{height:"100%", width:"100%", gap: 40}}>
                           
                              <div className={styles.presaleinfobox}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  Enter The amount
                                  </h2>
                                  <p className={styles.presaleinfotext}>
                                  Enter The Amount Of Sol You would like to swap to $OCN.<span style={{color:"#e84839"}}> Press Swap When Ready</span>
                                  </p>
                              </div>

                            <PreSaleSwapCard
                            publicKey={publicKey ? publicKey : provider?.publicKey}
                            connected={connected}
                            connection={connection}
                            liqObj={liqInfo}
                            onNextStep={onNextStep}
                            userSolBalance={userSolBalance}
                            userTokenBalance={userTokenBalance}
                            GetUserBalances={GetUserBalances}
                            provider={provider}
                            />

                            {/* <QuickSwapCard/> */}
                          </Flex>        
                      </div>
                  </motion.div>
                }

                {stepIndex == 3 && 
                <motion.div
                className={styles.presaleslide}
                style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                
                }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                >
                      <h3 className={styles.tokeninfotitletext}>
                        COMPLETE
                      </h3>

                    <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical align='center' style={{height:"100%", width:"100%", gap: 40}}>
                           
                              <div className={styles.presaleinfobox}
                              style={{
                                  gap:10, height:300
                              }}>
                                  <h2 className={styles.presaleboxTitletext}>
                                  WELCOME TO THE <span style={{color:"#e84839"}}> $OCN TEAM</span>
                                  </h2>
                                 
                                  <p className={styles.presaleboxTitletext}>
                                  YOU HOLD: {userTokenBalance?.displayString} $OCN
                                  </p>

                                  <p className={styles.presaleinfotext}>
                                  Stay tuned for big announcements.
                                  {/* <span style={{color:"#e84839"}}> Press Swap When Ready</span> */}
                                  </p>

                                    <Button href={"/"}
                                    style={{width:"90%", height:50, backgroundColor:"#e84839", display:"flex", alignItems:"center",justifyContent:"center"}}
                                    >
                                        <div style={{width:"100%", height:"100%", backgroundColor:"#e84839",
                                                display:"flex", alignItems:"center",justifyContent:"center",
                                                borderRadius:6
                                        }}>
                                        <h3>Complete</h3>
                                        </div>
                                    </Button>
                              </div>

                            
                          </Flex>        
                      </div>
                  </motion.div>
                }

                  <Flex justify="space-between" style={{width:"95%", alignSelf:"center", height:100, backgroundColor:"black"}}>
                  
                    {stepIndex != 0 && stepIndex != 3 ?
                    <Button onClick={() => onNextStep(false)}
                    style={{width:200, height:80, backgroundColor:"#e67e22",
                        fontWeight:"600"
                    }}>
                        Last Step
                    </Button>
                    :
                    <div style={{width:200, height:80}}/>
                    }

                    {stepIndex < 2 &&
                    <Button onClick={() => onNextStep(true)}
                    style={{width:200, height:80, backgroundColor:"#e67e22",
                        fontWeight:"600"
                    }}>
                        Next Step
                    </Button>
                    }
            </Flex>

            </div>
            
            </main>
        </div>
    );
};

export default PresalePage;