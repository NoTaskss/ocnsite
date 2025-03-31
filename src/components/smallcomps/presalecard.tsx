"use client"
import { Button, Card, Flex, Progress } from 'antd'
import Image from 'next/image'
import React from 'react'
import pre from "../../images/pre.png"
import { Text } from '../text'
import CountdownTimer from './countdowntimer'
import WalletLoginCard from './walletlogincard'
import Link from 'next/link'
import cardBack from "../../images/cardback.png"
const PreSaleCard = () => {
  return (
    <>
    <Flex 
    //justify='center' 
    align='center'
    style={{width:500, height:"auto", padding:20, 
        backgroundColor:"black",
        borderRadius:12,
        position:"relative",
        backgroundImage: `url(${cardBack.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderWidth:4,
        borderColor:"#e84839",
        borderStyle:"solid"
    }}
    vertical
    >
        <div style={{position:"absolute", width:"100%", height:"100%",
        zIndex:0, opacity:1, borderRadius:12
         }}/>
            
            <h3 style={{fontSize: 30, marginBlockEnd: 0, marginBlockStart:0, zIndex:1}}>
            $OCN PRESALE STARTS
            </h3>

            <Flex style={{zIndex:1}}>
                <Flex>
                    <CountdownTimer targetDate="2025-04-03T12:00:00"/>
                </Flex>
            </Flex>

            <p style={{width:"80%", textAlign:"center", zIndex:1}}>
                JOIN THE $OCN FAMILY BY PARTICIPATING IN THE PRESALE
            </p>

            {/* <div style={{width:"80%", zIndex:1, height:20, backgroundColor:"#343434", borderRadius: 12, position:"relative"}}>
                <div style={{width:"3%", height:20, backgroundColor:"black", //borderRadius: 12,
                    borderTopLeftRadius:12, borderBottomLeftRadius: 12
                }}/>
                
                <p style={{width:"100%",zIndex:1, textAlign:"center",position:"absolute", top:-16,
                    fontSize:15
                }}>
                    PreSale Progress 
                </p>

            </div> */}

            {/* <Flex>
                <p style={{width:"100%", textAlign:"center", zIndex:1}}>
                    Your $OCN Holdings = 
                </p>
            </Flex> */}
            
        
            <Flex style={{zIndex:1}}>
            
            <Button href={"/presale"}
            style={{width:300, height:50, backgroundColor:"#e84839", display:"flex", alignItems:"center",justifyContent:"center"}}
            >
                <div style={{width:300, height:50, backgroundColor:"#e84839",
                     display:"flex", alignItems:"center",justifyContent:"center",
                     borderRadius:6
                }}>
                <h3>ENTER PRESALE</h3>
                </div>
            </Button>
            </Flex>
            
    </Flex>
    </>
  )
}

export default PreSaleCard