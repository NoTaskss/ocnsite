"use client"
import { Keypair, Transaction, Signer, VersionedTransaction, SendOptions, PublicKey } from '@solana/web3.js';
import { Card, Col, List, Skeleton, Button, InputNumber, Row, Flex, notification, Collapse, Divider, ConfigProvider, Alert, Input, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Text } from '../text'

import { FaArrowDown, FaCheckCircle, FaDizzy, FaExclamationCircle } from "react-icons/fa";
import { GetSolBalance, GetTokenBalance } from '../../utils/walletutils';

import SolIcon from "../../images/solicon.jpeg"
import Image from 'next/image';
import type { NotificationArgsProps } from 'antd';
import { DEFAULT_TOKEN, GAS_OPTIONS } from '../../constants/swapconstants';
import WalletLoginCard from '../smallcomps/walletlogincard';
import LoadingCircle from '../smallcomps/loadingcircle';
import { AddTrxToCache, DeleteCacheWithKey, GetCachedData, SetCachedData } from '../../utils/cacheutils';

import { useGlobalContext } from '../../contexts';
import { FaArrowRight } from "react-icons/fa";
import { PreSaleSwapButton } from './presaleswapbutton';
import styles from '../../styles/Home.module.css';
import PhantomSignInButton from './phantomsigninbutton';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = NotificationArgsProps['placement'];


const { Option } = Select;

const PreSaleSwapCard = (props: any) => {

    const { user, setRecentTransContext } = useGlobalContext();

    const {loading, connected, tokenExternals, onSendTransComplete, selectedMarket, tokenMeta, publicKey, connection, sendTransaction,
        liqObj, provider
    } = props

    const [api, contextHolder] = notification.useNotification();

    const solInputOptions=[
        {
            value: .05,
        },
        {
            value: .1,
        },
        {
            value: .2,
        },
        {
            value: .5,
        },
        {
            value: 1,
        },
        {
            value: 1.5,
        },
        {
            value: 2.0,
        },
        {
            value: 5.0,
        }
    ]

    const usdcInputOptions=[
        {
            value: 1,
        },
        {
            value: 2,
        },
        {
            value: 5,
        },
        {
            value: 10,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 75,
        },
        {
            value: 100,
        }
    ]

    const slippageOptions = [
        {
            value: 1,
        },
        {
            value: 5,
        },
        {
            value: 10,
        },
        {
            value: 20,
        },
        {
            value: 30,
        },
        {
            value: 40,
        },
        {
            value: 50,
        }
    ]

    //.002 fee
    //Units - 101000
    //Micro Lamports - 23000149
    //.0001 fee
    //Units - 101337
    //Micro Lamports - 1203491
    //0.00001 fee
    //Units - 90000
    //Micro Lamports - 121377
    const gasOptions = GAS_OPTIONS

    const sellAmountOptions = [
        {
            index: 0,
            display:"10%",
            value: .1,
        },
        {
            index: 1,
            display:"25%",
            value: .25,
        },
        {
            index: 2,
            display:"33%",
            value: .33,
        },
        {
            index: 3,
            display:"50%",
            value: .5,
            
        },
        {
            index: 4,
            display:"75%",
            value: .75,
            
        },
        {
            index: 5,
            display:"100%",
            value: 1,
            
        },
    ]

    const [userSolBalance, setUserSolBalance] = useState(0)

    const [userUSDCBalance, setUserUSDCBalance] = useState(0)

    const [userTokenBalance, setUserTokenBalance] = useState<any>({tokenBalance: 0, displayString: "0", mintAd: ""})

    const [outputTokens, setOutPutTokens] = useState(0)

    const [inBuyMode, setInBuyMode] = useState(true)

    const [solInputAmount, setSolInputAmount] = useState<any | null>(0.00)

    const [sellTokenAmount, setSellTokenAmount] = useState<any | null>(0)

    const [sellPercVis, setSellPercVis] = useState(1)

    const [slippageInput, setSlippageInput] = useState<number | null>(5)

    const [gasSelOption, setGasSelOption] = useState<any>(gasOptions[1])

    const [recentTrans, setRecentTrans] = useState<any>([])

    console.log("ALL TRANSACTION ", recentTrans)

    console.log("USER TOKEN BALANCE ", props?.userTokenBalance)

    //const [selectedMarket, setSelectedMarket] = useState(markets?.[0])

    function OnTrxComplete(){
        GetUserSolBalance()

        GetUserBalanceOfToken(props?.userTokenBalance.mintAd)
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

        console.log("GOT TOKEN BALANCE ", tokenBalance)
        if(mintAd == DEFAULT_TOKEN.USDC.mint.toString()){

            setUserUSDCBalance(displayString)
            return
        }

        setUserTokenBalance({tokenBalance, displayString, mintAd})
    }

    useEffect(() => {

        return

        if(!connected && props?.userSolBalance > 0){
            setUserSolBalance(0)
            return
        }

        if(!connected){
            return
        }

        if(props?.userSolBalance == 0){
           
            GetUserSolBalance()
        }
          // make sure to catch any error
          
      }, [connected])

      useEffect(() => {
        return

        if(!connected){
            setUserTokenBalance({tokenBalance: 0, displayString: "0", mintAd: ""})
            return
        }

        if(!publicKey){
            return
        }

        const oldTrans = GetCachedData(tokenMeta?.metadata?.mint+"-transactions")

        console.log("ODL TRANSSS ", oldTrans)

        if(oldTrans){
            //DeleteCacheWithKey(tokenMeta?.metadata?.mint+"-transactions")
            setRecentTrans(oldTrans?.transactions)
        }

        // if(selectedMarket?.lp?.baseMintAd == DEFAULT_TOKEN.USDC.mint.toString() || selectedMarket?.lp?.quoteMintAd == DEFAULT_TOKEN.USDC.mint.toString()){

        //     if(userUSDCBalance == 0){
        //         GetUserBalanceOfToken(selectedMarket?.lp?.baseMintAd)
        //     }
        // }

        const mintAd = "7H1v9zHqa9StX2F2yEeEgiwYt76ixRjFTN7c2d1fp4Bv" //selectedMarket?.lp?.invserse ? selectedMarket?.lp?.quoteMintAd : selectedMarket?.lp?.baseMintAd
   
        if(props?.userTokenBalance.mintAd != mintAd){
            console.log("USER TOKEN BALANCE 0 ", mintAd)
            GetUserBalanceOfToken(mintAd)
        }
        
          // make sure to catch any error
          
      }, [tokenMeta]) 


    const customizeRenderEmpty = () => (
        <Flex vertical align='center' justify='center'>
            {loading ? <LoadingCircle/> :
            <>
            <FaDizzy size={50}/>
            <Text size='lg'>No Transactions Found</Text>
            </>
            }   
        </Flex>
    );

    const onInputAmountChange = (value: any | null) => {

        if (!isNaN(value)) {
            setSolInputAmount(value)
        }
        
        var outPut = (parseFloat(liqObj.tokenBalance) * parseFloat(value)) / (liqObj.solBalance + parseFloat(value));

        console.log("OUT PUTTT ", outPut, " -- ", liqObj, " ", value)

        setOutPutTokens(outPut)
    
    };

    const onSellInputAmountChange = (value: any | null) => {
    
        if (!isNaN(value)) {
            console.log("SELL IMPT CHANGE ", value)
            setSellTokenAmount(Number(value))
        }
    };

    function HandleSellInputPerc(input:any){

        const newInput = userTokenBalance?.displayString * input.value

        setSellTokenAmount(newInput)
    }

    const onSlippageCustomChange = (value: any | null) => {
        
        if (!isNaN(value)) {
            setSlippageInput(value)
        }
    };

    const HandleInputTokenChange =(newInput: any) => {
        console.log("INPUT TOKEN CHANGE -- ", newInput)
    }

    const openNotificationWithIcon = (action: string, type: NotificationType, placement: NotificationPlacement, description: string, duration: number) => {
        api[type]({
        message: action, type,
        description:description,
        placement,
        duration,
        });
    };

    const openLoadNotif = (action: string, type: NotificationType, placement: NotificationPlacement, description: string, duration: number) => {
        api.open({
            key: "trx",
            message: 'Notification Title',
            description: 'description.',
          })
          
          setTimeout(() => {
            api.open({
              key:"trx",
              message: 'New Title',
              description: 'New description.',
            });
          }, 1000);
    };

    async function sendTx(
        payer: Keypair | Signer | any,
        txs: (VersionedTransaction | Transaction)[],
        options?: SendOptions
      ): Promise<any> { //Promise<string[]> {

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();


        const txids: string[] = [];
        for (const iTx of txs) {
          if (iTx instanceof VersionedTransaction) {
            //iTx.sign([payer]);
            //txids.push(await connection.sendTransaction(iTx, options));
            txids.push(await sendTransaction(iTx, connection, { minContextSlot })
            .catch((e: any) => {return{txids: -1, lastHash: {blockhash: null, lastValidBlockHeight: null}}}));

          } else {
            txids.push(await sendTransaction(iTx, connection, { minContextSlot })
            .catch((e: any) => {return{txids: -1, lastHash: {blockhash: null, lastValidBlockHeight: null}}}));
            //txids.push(await connection.sendTransaction(iTx, [payer], options));
          }
        }
        return {txids, lastHash: {blockhash, lastValidBlockHeight}};
    }

    function HandelTrans(type: any){
        
        if(type == "aborted"){
            openNotificationWithIcon("Transaction Aborted" ,"error", "bottom", "User Rejected Request", 10)
            return
        }

        if(type == "sent"){
            openNotificationWithIcon("Sent Transaction. Please Wait..." ,"info", "bottom", "", 30)
            return
        }

        if(type == "timedout"){
            openNotificationWithIcon("Transaction TimedOut" ,"error", "bottom", "Try Again", 10)
            return
        }

        if(type == "failed"){
            openNotificationWithIcon("Transaction Failed" ,"error", "bottom", "", 10)
            return
        }

        if(type == "confirm"){
            openNotificationWithIcon("Transaction Confirmed", "success", "bottom", "Check Recent Transactions For More Info", 10)
            //OnTrxComplete()
            props?.GetUserBalances()
            props?.onNextStep(true)
            return
        }
    
    }

  return (
    <>
    {contextHolder}
    <Card 
        // title={
        // <Text size="xxl">
        //     Quick Swap {tokenMeta?.metadata?.symbol}
        // </Text>}
        className={styles.presaleswapcard}
        styles={{body: {padding: '10px 8px 8px 12px'}, title:{padding: 10}}}
        size="small"
        >
        {loading ? 
        <LoadingCircle/> :
        <Flex vertical align='flex-start' justify="center">
            <Flex>
                <Flex vertical style={{}}>
                    <Alert message="Swap Using Your Wallet!" 
                    type="info" showIcon
                    className={styles.presalecardinfotag0}
                    />
                </Flex> 
            </Flex>
                 

            <Collapse
            defaultActiveKey={["1"]}
            collapsible="disabled"
            size="large"
            style={{width:'100%', fontWeight:'bold'}}
            bordered={false}
            items={[{ key: '1', showArrow: false, 
            label: <h4 className={styles.presalecardbalance}>
                {inBuyMode ? 
                "Balance | " + (selectedMarket?.lp?.baseMintAd == DEFAULT_TOKEN.USDC.mint.toString() ? userUSDCBalance : props?.userSolBalance) + " SOL - OCN Balance - " + props?.userTokenBalance?.displayString + "" //tokenMeta?.metadata.symbol
                :
                "Balance | " + props?.userTokenBalance?.displayString + " " + tokenMeta?.metadata.symbol
                }
                </h4>,
            children:
            <Flex gap={15} align='center' justify="space-between" style={{}}>
                <Flex vertical align='center' style={{maxWidth: "100%"}}>
                    
                <Flex className={styles.presalecardinputflex} gap={20}>
                      
                      <Flex align='center' justify="flex-start" style={{marginTop:0, marginBottom:10}}>
                  
                          <Button
                          className={styles.presalecardinputname}
                          >
                              <h4 className={styles.presalecardinputnametext}
                              >
                                { 
                                "SOL"
                                }
                              </h4>
                          </Button>

                          <Space.Compact size="large" className={styles.presalecardinputholder}>
                              <Input
                              classNames={{input:styles.presalecardinputtext}}
                              placeholder="0.00"
                              maxLength={5}
                              onChange={(e: any) => {onInputAmountChange(e.target.value)}} 
                              value={solInputAmount}
                              size="large" 
                              />
                          </Space.Compact>
                
                        </Flex>

                        <Flex align='center' justify="flex-start" style={{marginTop:0, marginBottom:10}}
                        gap={20}>
                            
                            <FaArrowRight size={30} />

                            <Flex vertical align='center'>
                                <Text size='sm'
                                style={{fontWeight:'bold', width: "100%", textAlign:"center"}}
                                >
                                You Will Recieve
                                </Text>  
                                <h4 
                                className={styles.presalecardoutputText}
                                >
                                {outputTokens?.toLocaleString()} $OCN
                                </h4>
                            </Flex>
                      </Flex>


                    </Flex>

                    <Flex align='center' justify='center' gap={5} wrap="wrap" style={{minWidth: "100%"}}>
                    {solInputOptions.map((option, i) => (
                        <Col key={i + "po"}>
                            <Button onClick={() => onInputAmountChange(option.value)}
                            className={styles.presaleinputbox}
                            style={{
                            backgroundColor: solInputAmount == option.value ? "#e84839" : "transparent",
                            }}>

                                <Image src={SolIcon}
                                unoptimized
                                width={20} height={20}
                                objectFit='contain'
                                style={{borderRadius: 12}}
                                />
                                <Text size='md' style={{fontWeight: 'bold'}}>
                                    {option.value}
                                </Text>
                            </Button>
                        </Col>
                    ))}
                    </Flex>

                </Flex>
                
                {/* <Flex vertical gap={20} style={{maxWidth: 200}}>
                    <Flex vertical>
                        <Text size='lg' style={{marginBottom: 5}}>Slippage</Text>
                        <Space.Compact size="large" style={{width: 200, height: 70}}>
                            
                            <Select 
                            defaultValue={slippageOptions[1].value+"%"}
                            dropdownStyle={{}}
                            onChange={(option: any) => {setSlippageInput(option)}}
                            style={{width: 100, height: 70}}
                            >
                            {slippageOptions.map((option, i) => (
                            <Select.Option key={i+"sss"} value={option.value}>
                               <Flex vertical>
                                    <Text size='lg' style={{fontWeight: 'bold'}}>
                                        {option.value}%
                                    </Text>
                                </Flex>
                                
                            </Select.Option>
                            ))} 
                            </Select>

                            <Input 
                            defaultValue={slippageInput?.toString()} 
                            prefix="%"
                            maxLength={2}
                            onChange={(e: any) => {onSlippageCustomChange(e.target.value)}} 
                            value={slippageInput?.toString()}
                            style={{width: 100}}
                            size="large"
                            />
                        </Space.Compact>
                    </Flex>

                    <Flex vertical>
                        <Text size='lg' style={{marginBottom: 5}}>Gas</Text>
                        <Space.Compact size="large" style={{width: 200, height: 70}}>
                            
                            <Select 
                            defaultValue={1}
                            dropdownStyle={{}}
                            onChange={(option: any) => {setGasSelOption(gasOptions[option])}}
                            style={{width: 200, height: 70}}
                            >
                            {gasOptions.map((option, i) => (
                            <Select.Option key={i+"sss"} value={option.index}>
                               <Flex vertical>
                                    <Text size='lg' style={{fontWeight: 'bold'}}>
                                        {option.display}
                                    </Text>
                                    <Text size='sm' style={{fontWeight: 'bold', color:'gray'}}>
                                        {option.value} Sol
                                    </Text>
                                </Flex>
                                
                            </Select.Option>
                            ))} 
                            </Select>

                        </Space.Compact>
                    </Flex>
                </Flex> */}
                
            </Flex>
            
            }]}/>            
            
            <Flex align='center' justify="space-between" style={{marginTop: 10, width:"100%"}}>
{/* 
                <Flex vertical align='center' justify="space-evenly" style={{paddingLeft:10, width:250}}>

                    <Divider orientation="left" style={{marginBottom: 0}}>
                        <Text size='lg'>Swap Details</Text>
                    </Divider>

                    <Flex align='center' justify="space-between" style={{
                        width:"100%", height:50
                    }}>
                    
                        <Text size="md" style={{fontWeight:'bold'}}>
                            Input
                        </Text>
                    
                        <Text size="md" style={{fontWeight:'bold'}}>
                            {inBuyMode ? solInputAmount : FormatNumber(sellTokenAmount)} {!inBuyMode ? tokenMeta?.metadata.symbol : "SOL"}
                        </Text>
                    </Flex>

                    <Flex align='center' justify="space-between" 
                    style={{width:"100%", height:40}}>
                        <Text size="md" style={{fontWeight:'bold'}}>
                            Slippage
                        </Text>
                    
                        <Text size="lg" style={{fontWeight:'bold'}}>
                            {slippageInput}%
                        </Text>
                    </Flex>

                    <Flex align='center' justify="space-between" style={{
                        width:"100%", height:40
                    }}>
                    
                        <Text size="md" style={{fontWeight:'bold'}}>
                            Gas
                        </Text>
                    
                        <Text size="lg" style={{fontWeight:'bold'}}>
                            {gasSelOption?.display}
                        </Text>
                    
                    </Flex>
                        
                </Flex> */}

                {!publicKey ? //!provider?.isConnected ? //!publicKey 
                // <PhantomSignInButton
                // provider={provider}
                // />
                <WalletLoginCard/> 
                :
                <PreSaleSwapButton
                input={solInputAmount}
                tokensRec={outputTokens}
                HandelTrans={HandelTrans}
                provider={provider}
                />
                //     <Button disabled={selectedMarket == null} onClick={() => HandleOnSwapPress()}
                //     style={{width:250, height: 60, 
                //     backgroundColor: inBuyMode ? 'green' : 'red'}}>
                //         {inBuyMode ? 
                //         <Text size='lg' style={{fontWeight:'bold'}}>
                //             BUY {solInputAmount} SOL OF $OCN
                //             {/* {tokenMeta?.metadata.symbol} */}
                //         </Text>
                //         :
                //         <Text size='lg' style={{fontWeight:'bold'}}>
                //             SELL {sellTokenAmount?.toFixed(2)} {tokenMeta?.metadata?.symbol}
                //         </Text>
                //         }
                // </Button>
                }

                {/* <Flex vertical align='center' justify="space-between">

                    <Flex vertical style={{paddingTop: 20}}>
                        <Alert message="Swap Executes at Normal Market Price" type="info" showIcon
                        style={{width: 300}}/>

                        <Alert message="Increase Gas If Swap Takes Too Long" type="warning" showIcon
                        style={{width:300}}/>

                        <Alert message="Refresh if Balances Are Wrong" type="warning" showIcon
                        style={{width:300}}/>
                    </Flex> 
                </Flex> */}
            </Flex>
        </Flex>
        }

        {/* <Collapse
            
            size="large"
            style={{width:'100%', fontWeight:'bold', marginTop: 10}}
            bordered={false}
            items={[{ key: '1', showArrow: false, 
            label: <Text size='xxl'>Recent Transactions | {recentTrans.length}</Text>, //`GAS | ${gasSelOption?.display}`, 
            children:
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <List
            itemLayout="horizontal"
            dataSource={recentTrans}
            renderItem={(item: any, index) => (
                <List.Item style={{width:'100%', height: 150, marginTop: 10,
                backgroundColor:'black', borderColor:'gray', borderWidth: 0, borderRadius: 20}}>
                    
                    <Flex vertical align="flex-start" justify="space-between" 
                    style={{width:'50%', height:100, paddingLeft: 15}}>

                        <Flex align='center' justify="flex-start" style={{marginLeft: 0, gap:15}}>
                            {item?.error === false ? 
                            <FaCheckCircle color="green" size={20}/> :
                            <FaExclamationCircle color='red' size={20}/>
                            }
                            <Text size='md' style={{fontWeight:'bolder'}}>
                                ID: {item?.id.slice(0, 10)}...
                            </Text>

                        </Flex>

                        <Text>{item?.date}</Text>

                        <Flex style={{flexDirection:'row', marginLeft: 10, gap:15, alignItems:'center'}}>

                            <Text size="xl" style={{width: 60, color: item?.action == "buy" ? "green" : 'red', fontWeight:'bold',
                                textTransform:'capitalize', textAlign:'center'}}>
                               {item?.action}
                            </Text>


                            <Text size='lg' style={{fontWeight:'bolder'}}>
                                {item?.action == "buy" ?
                               item?.inputAmount + " SOL OF " + tokenMeta?.metadata.symbol
                               :
                               FormatNumber(item?.inputAmount) + " OF " + tokenMeta?.metadata.symbol
                            }
                            </Text>
                        </Flex>

                    </Flex>

                    <Flex vertical align="flex-end" justify="space-between"
                    style={{width:'50%', height:100}}>

                         <Flex style={{
                        marginRight: 10}}>

                        <a style={{width:'100%'}}
                        href={`https://solscan.io/tx/${item?.id}`} target="_blank" rel='noopener noreferrer'>
                            <Button 
                            style={{backgroundColor:"blueviolet",
                            width: 160, height: 40, display:'flex', alignItems:'center', gap: 5}}>
                                <Flex gap={10} style={{width:'100%'}} align='center' justify='center'>
                                    <Image unoptimized
                                    src={SolScanLogo} alt='SolScan'
                                    width={20} height={20}
                                    objectFit='contain'/>
                                    <Text style={{fontWeight:'bold'}}>Sol Scan</Text>
                                </Flex>
                            </Button>
                            </a>
                        </Flex>

                        <Flex style={{
                        flexDirection:'column', alignItems:'center',
                        marginRight: 10,
                        }}>

                            <a style={{width:'100%'}}
                            href={`https://dexscreener.com/solana/${selectedMarket?.pubkey}?maker=${publicKey}`} target="_blank" rel='noopener noreferrer'>
                            
                            <Button 
                            style={{backgroundColor:"black", 
                            width: 160, height: 50}}>
                                <Flex align='center' style={{padding:5, gap: 10}}>
                                <Image unoptimized
                                src={DexScreenerLogo} alt='DexScreener'
                                style={{}}
                                width={40} height={40} objectFit="contain"/>
                                <Text style={{fontWeight:'bold', fontSize: 10}}>
                                   VIEW POSITION
                                </Text>
                                </Flex>
                            </Button>
                            </a>


                        </Flex>

                    </Flex>

                </List.Item>
                
            )}
            
            />
            </ConfigProvider>
            }]}
            /> */}
        
    </Card>
    </>
  )
}

export default PreSaleSwapCard