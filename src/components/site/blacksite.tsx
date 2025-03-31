"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Home.module.css';
import nostraicon0 from '../../images/notratoken.png'
import domp from '../../images/domp.jpeg'
import man0 from '../../images/manbig.png'
import smoke0 from '../../images/smoke0.png'
import hat0 from '../../images/hatbot.png'
import stick0 from '../../images/manbot.png'
import bookicon from '../../images/bookicon.png'
import suiticon from '../../images/suiticon.png'
import manicon from '../../images/manicon.png'
import noshero from '../../images/nostrahero1.png'

import chart50 from '../../images/circle50.png'
import chart40 from '../../images/circlefourty.png'
import chart30 from '../../images/circlethirty.png'
import chart25 from '../../images/circle25.png'
import chart20 from '../../images/circletwenty.png'

import { motion } from "framer-motion";
import { Button, Flex } from 'antd';
import { Text } from '../text';

import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import PreSaleCard from '../smallcomps/presalecard';
import LoginComp from '../smallcomps/logincomp';
import WalletLoginCard from '../smallcomps/walletlogincard';

const Blacksite = (props: any) => {
  //const { user, setUser } = useGlobalContext();

  const [didSignIn, setDidSignIn] = useState<any>(false)
  
  const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  const sectionRefPresale: any = useRef(null);
  const sectionRefAbout: any = useRef(null);
  const sectionRefHow: any = useRef(null);
  const sectionRefTokenomics: any = useRef(null);

  const handleScroll = (scrollRef: any) => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  return (
      <div className={styles.maincontainer}>

        {!didSignIn &&
        <LoginComp
        setDidSignIn={setDidSignIn}
        />
        }

          <main className={styles.main}>

          <div className={styles.container}>

            <div style={{width:"90%", height:100, position:"fixed", top:20,
                backgroundColor:"#e84839", zIndex:20,
                display:"flex", alignItems:"center", justifyContent:"space-around",
                borderRadius:12, padding:5
            }}>
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

                <div className={styles.headerinfoholder}>

                    <button onClick={() => handleScroll(sectionRefPresale)} className={styles.headertitle}>
                        Presale
                    </button>

                    <button onClick={() => handleScroll(sectionRefAbout)} className={styles.headertitle}>
                        About
                    </button>

                    <button onClick={() => handleScroll(sectionRefHow)} className={styles.headertitle}>
                        How To Buy
                    </button>

                    <button onClick={() => handleScroll(sectionRefTokenomics)} className={styles.headertitle}>
                        Tokenomics
                    </button>
                </div>

                <Flex gap={20} className={styles.headerlinks}>
                    {/* <FaXTwitter size={30}/>

                    <FaYoutube size={30}/>

                    <FaTiktok size={30}/>

                    <FaTelegramPlane size={30}/> */}


                    <WalletLoginCard/>
           


                </Flex>
            </div>

            <div className={styles.columns}>

                  <motion.div
                  ref={sectionRefPresale}
                      className={styles.column}
                      style={{padding:0, height:"90vh",
                       }}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      <div style={{width: "100%",
                      height: "100%",
                     // backgroundImage: `url(${nosback0.src})`,
                      backgroundColor:"black",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"}}>

                          
                          <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: [.3, 0.1, .3] }} // Animate between 1 and 0.5
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} // Loop infinitely
                          className={styles.smokeholder}
                          >
                              <Image unoptimized
                              width={900}
                              height={900}
                              objectFit='contain'
                              src={smoke0}
                              style={{}}/>
                          </motion.div>

                        
                          <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          className={styles.manholder}
                          >
                              <Image unoptimized
                              width={1000}
                              height={1000}
                              objectFit='contain'
                              src={noshero}
                              style={{}}/>
                                  
                          </motion.div>

                          <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          style={{position:"absolute", bottom:0, width:"100%"}}
                          >
                              <Flex vertical style={{width:"100%", height:"100%", marginTop:20}} align='center' justify='center'>
                                  
                                  <div style={{display:"flex", flexDirection:"row", //backgroundColor:"black", borderRadius: 12, padding:10,
                                      bottom: 100,
                                      width:"95%",
                                      position:"relative"
                                  }}>
                                     
                                    <div className={styles.presalecardholder}>
                                      <PreSaleCard/>
                                    </div>

                                  </div>

                                 

                              </Flex>
                          </motion.div>

                    </div>
                      
                  </motion.div>

                  <motion.div
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                    //height:800
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >
                      <h3 className={styles.tokeninfotitletext}>
                      THE OFFICIAL Crypto Nostra TOKEN
                      </h3>

                      <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical style={{height:"100%", width:"50%", gap: 40}}>
                           
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Name: 
                                  </Text>
                                  <p className={styles.tokeninfonametext}>
                                  Offical Crypto Nostra
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Ticker: 
                                  </Text>
                                  <p className={styles.tokeninfotext}>
                                  OCN
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Supply: 
                                  </Text>
                                  
                                  <p className={styles.tokeninfotext}>
                                  2 Billion
                                  </p>
                                  
                              </div>     
                          </Flex>        

                          <Flex vertical style={{height:"100%", width:"50%", gap:40}}>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Liquidity: 
                                  </Text>
                                  <p className={styles.tokeninfotext}>
                                  Burned
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Minting: 
                                  </Text>
                                  
                                  <p className={styles.tokeninfotext}>
                                  Revoked
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <Text style={{color:"white", fontSize: 15, position:"absolute", top:-30, left:0}}>
                                  Tax: 
                                  </Text>
                                  <p className={styles.tokeninfotext}>
                                      1%
                                  </p>
                                  
                              </div>     
                          </Flex>                   
                      </div>

                  </motion.div>

                  <motion.div
                  ref={sectionRefAbout}
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", 
                    //height:800, 
                    display:"flex", alignItems:"center", justifyContent:"center"}}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >

                      <Flex vertical align='center' style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                          
                          <div style={{textAlign:"left", width:"80%", display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end"}}>
                              
                              <h3 className={styles.tokenabouttitle}>
                                  About
                              </h3>

                              <Image unoptimized
                              width={250}
                              height={250}
                              objectFit='contain'
                              src={hat0}
                              style={{}}/>
                          </div>

                          <div style={{width:"80%", padding: 10, borderWidth: 2, borderColor:"white", borderStyle:"solid", display:"flex", alignItems:"center", justifyContent:"center"}}>
                              <p className={styles.tokenaboutdesc}>
                              Official Crypto Nostra (OCN) is a mafia-themed cryptocurrency token centered around community, loyalty, and strategic collaboration. Designed to operate like a close-knit crime family, OCN emphasizes unity, exclusivity, and mutual support among holders.
                              </p>
                          </div>

                          

                      </Flex>
                  </motion.div>

                  <motion.div
                  ref={sectionRefHow}
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                     height:"auto"
                    //height:800
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >
                      <h3 className={styles.tokeninfotitletext}>
                      How To Buy
                      </h3>

                      <div style={{width:"60%", height:50, textAlign:"center", backgroundColor:"#e84839",
                        borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center"
                      }}>
                        <p style={{fontSize:20, fontWeight:600, marginBlockStart:0, marginTop:20}}>CA: COMING SOON</p>
                      </div>

                      <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical style={{height:"100%", width:"100%", gap: 40}}>
                           
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative",
                              }}>
                                  <h2 className={styles.tokeninfonametext}>
                                  Create A Wallet
                                  </h2>
                                  <p className={styles.presaleinfotext}>
                                  Download a Solana wallet such as <span style={{color:"#e84839"}}> Phantom, Solflare, or Backpack.</span> Create your wallet, save your recovery phrase, and you are ready to go.
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                <h2 className={styles.tokeninfonametext}>
                                  Buy Solana
                                </h2>
                                <p className={styles.presaleinfotext}>
                                  Buy SOL from an exchange such as <span style={{color:"#e84839"}}>Binance, Coinbase, or Kraken.</span>  Send it to your Solana wallet using the correct network.
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <h2 className={styles.tokeninfonametext}>
                                  Swap SOL for $OCN
                                    </h2>
                                    <p className={styles.presaleinfotext}>
                                    Connect your wallet and swap directly here or visit an DEX exchange such as Jupiter or Raydium.
                                  </p>
                                  
                              </div>     
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <h2 className={styles.tokeninfonametext}>
                                  HODL & Enjoy the Ride
                                    </h2>
                                 <p className={styles.presaleinfotext}>
                                  You are now part of the $OCN community! Hold tight, share the world, and lets send it to the moon!
                                  </p>
                                  
                              </div>     
                          </Flex>        
                      </div>
                  </motion.div>

                  <motion.div
                  ref={sectionRefTokenomics}
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", height:"auto"
                    //height:800
                }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >

                      <Flex vertical align='center' gap={0}
                      style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  
                          <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end"}}>
                              <h3 className={styles.tokenabouttitle}>
                                OCN Tokenomics
                              </h3>
                          </div>
                        
                        <Flex vertical justify="space-between" gap={20} style={{width:"90%"}}>

                          <div style={{width:"100%", display:"flex", flexDirection:"column", 
                            alignItems:"center", justifyContent:"center",
                            borderWidth:7, borderColor:"#e84839", borderStyle:"solid",
                            borderRadius: 26,
                            padding:15
                            }}>
                             
                            <Flex justify="space-evenly" style={{width:"100%", flexWrap:"wrap"}}>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart30}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        OCN Game
                                    </h6>
                                </Flex>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart30}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        OCN Team
                                    </h6>
                                </Flex>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart20}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        Liquidity Pool
                                    </h6>
                                </Flex>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart20}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        Presale
                                    </h6>
                                </Flex>
                            </Flex>

                            <h3 className={styles.tokenomictitle}>
                               TOTAL SUPPLY: <span style={{color:"#e84839"}}>2 Billion SUPPLY</span>
                            </h3>

                          </div>

                          <div style={{width:"100%", display:"flex", flexDirection:"column", 
                            alignItems:"center", justifyContent:"center",
                            borderWidth:7, borderColor:"#e84839", borderStyle:"solid",
                            borderRadius: 26,
                            padding:15
                            }}>
                            
                              <Flex justify="space-evenly" style={{width:"100%", flexWrap:"wrap"}}>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart50}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        OCN Game
                                    </h6>
                                </Flex>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart25}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        Charity
                                    </h6>
                                </Flex>

                                <Flex vertical align='center'>
                                    <Image unoptimized
                                    width={150}
                                    height={150}
                                    objectFit='contain'
                                    src={chart25}
                                    style={{}}/>

                                    <div className={styles.circlelinedown}/>
                                    
                                    <div className={styles.circleHollow}/>

                                    <h6 className={styles.tokenomictitlesmall}>
                                        OCN Development
                                    </h6>
                                </Flex>

                            </Flex>

                            <h3 className={styles.tokenomictitle}>
                               TAX: <span style={{color:"#e84839"}}>1%</span>
                            </h3>

                          </div>
                          </Flex>

                      </Flex>
                  </motion.div>

                  <motion.div
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", display:"flex", flexDirection:"column",
                    height:"auto"
                    //height:800
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >
                      <h3 className={styles.tokeninfotitletext}>
                      ROADMAP
                      </h3>

                      <div className={styles.tokeninforows} style={{marginTop: 20}}>
                          
                          <Flex vertical style={{height:"100%", width:"100%", gap: 40}}>
                           
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative",
                              }}>
                                  <h2 className={styles.tokeninfonametext}
                                  style={{textTransform:"uppercase"}}>
                                  Phase 1
                                  </h2>
                                  <p className={styles.presaleinfotext}>
                                  Give Early Access To $OCN With a whitelist Presale
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                <h2 className={styles.tokeninfonametext}
                                style={{textTransform:"uppercase"}}>
                                    Phase 2
                                </h2>
                                <p className={styles.presaleinfotext}>
                                  Launch $OCN Liquidity Pool With <span style={{color:"#e84839"}}>Raydium.</span>.
                                  </p>
                              </div>
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <h2 className={styles.tokeninfonametext}
                                  style={{textTransform:"uppercase"}}>
                                  Phase 3
                                    </h2>
                                  <p style={{fontSize: 20, marginBlockStart:0}}>
                                   ...
                                  </p>
                                  
                              </div>     
                              <div className={styles.tokeninfobox}
                              style={{borderRadius: 6,
                                  borderWidth: 2, borderColor:"White", borderStyle:"solid", position:"relative"
                              }}>
                                  <h2 className={styles.tokeninfonametext}
                                  style={{textTransform:"uppercase"}}>
                                  Phase 4
                                    </h2>
                                  <p style={{fontSize: 20, marginBlockStart:0, textTransform:"uppercase"}}>
                                  ...
                                  </p>
                                  
                              </div>     
                          </Flex>        
                      </div>
                  </motion.div>

                  <motion.div
                  className={styles.infocolumn}
                  style={{backgroundColor:"black", 
                    //height:800
                }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >

                      <Flex vertical align='center' style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  
                          <div style={{width:"80%", display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end"}}>
                              <h3 className={styles.tokenabouttitle}>
                                  The Goal
                              </h3>

                              <Image unoptimized
                              width={250}
                              height={250}
                              objectFit='contain'
                              src={stick0}
                              style={{}}/>
                          </div>

                          <div style={{width:"80%", padding: 20, borderWidth: 2, borderColor:"white", borderStyle:"solid", display:"flex", alignItems:"center", justifyContent:"center"}}>
                              <p className={styles.tokenaboutdesc}>
                              A community-driven cryptocurrency token inspired by the structure and loyalty of a mafia family. Built on the principles of trust, respect, and collaboration, OCN unites its holders as part of an exclusive brotherhood.
                              </p>
                          </div>

                      </Flex>
                  </motion.div>

                  <motion.div
                  className={styles.infobigcolumn}
                  style={{backgroundColor:"black", 
                   // height:1000
                }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >

                      <Flex vertical align='center' justify="flex-start" style={{width:"100%", height:"100%"}}>
                          
                          <div>
                              
                              <h3 className={styles.tokenabouttitle}>
                                  The Family
                              </h3>

                          </div>

                          <div className={styles.familybox}>
                              <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                              Leader
                              </p>

                              <Image unoptimized
                              width={200}
                              height={200}
                              objectFit='contain'
                              src={domp}
                              style={{}}/>

                              <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                                  Dominick Cicale
                              </p>
                          
                              <a href="https://www.youtube.com/@mafiaroundtable">
                                  <FaYoutube color='white' size={40}/>
                              </a>

                          </div>

                          <div style={{width:"100%", display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"center", marginTop: 10, gap: 10}}>

                              <div className={styles.familyboxsec}>
                                  <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                                  Underboss
                                  </p>

                                  <Image unoptimized
                                  width={200}
                                  height={200}
                                  objectFit='contain'
                                  src={man0}
                                  style={{}}/>

                                  <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                                      -----
                                  </p>
                              
                                  <a href="https://www.youtube.com/@mafiaroundtable">
                                      <FaYoutube color='white' size={40}/>
                                  </a>

                              </div>

                              <div className={styles.familyboxsec}>
                                  <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                                  Underboss
                                  </p>

                                  <Image unoptimized
                                  width={200}
                                  height={200}
                                  objectFit='contain'
                                  src={man0}
                                  style={{}}/>

                                  <p style={{color:"white", fontSize: 20, fontFamily:"Poiret One"}}>
                                      ------
                                  </p>
                              
                                  <a href="https://www.youtube.com/@mafiaroundtable">
                                      <FaYoutube color='white' size={40}/>
                                  </a>

                              </div>

                          </div>

                      </Flex>
                  </motion.div>

                  <motion.div
                  className={styles.infobigcolumn}
                  style={{backgroundColor:"black", 
                   // height:1000
                   padding:50
                }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  >

                      <Flex vertical align='center' className={styles.utilrow}>
                          
                          <div>
                              <h3 className={styles.tokenabouttitle}>
                                  $OCN Utility
                              </h3>
                          </div>

                          <Flex align='center' justify='center' className={styles.utilholder}>

                              <div className={styles.utilbox}>
                                  <Image unoptimized
                                  width={200}
                                  height={200}
                                  objectFit='contain'
                                  src={bookicon}
                                  style={{}}/>
  
                                  <p className={styles.utiltext}>
                                  Trade Tokens for Book
                                  </p>

                              </div>
                              
                              <div className={styles.utilbox}>
                                  <Image unoptimized
                                  width={200}
                                  height={200}
                                  objectFit='contain'
                                  src={suiticon}
                                  style={{}}/>
  
                                  <p className={styles.utiltext}>
                                  Trade Tokens for Merch
                                  </p>

                              </div>

                              <div className={styles.utilbox}>
                                  <Image unoptimized
                                  width={200}
                                  height={200}
                                  objectFit='contain'
                                  src={manicon}
                                  style={{}}/>
  
                                  <p className={styles.utiltext}>
                                  Trade Tokens for Nfts
                                  </p>

                              </div>
                              
                          </Flex>

                      </Flex>
                  </motion.div>

              </div>
          </div>

              {/* <div className={styles.walletButtons}>
                  <WalletMultiButtonDynamic />
                  <WalletDisconnectButtonDynamic />
              </div> */}
          </main>

         
      </div>
  );
}

export default Blacksite