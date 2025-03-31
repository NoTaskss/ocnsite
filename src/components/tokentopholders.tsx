import { Card, Col, Flex, List, Segmented, Skeleton } from 'antd'
import React from 'react'
import { Text } from './text'
import { FormatNumber } from "../utils/numberutils"
import Link from 'next/link'
import { FaCrown } from "react-icons/fa6";
import { RAYDIUM_WALLET_ADD } from '../constants/swapconstants'
import LoadingCircle from './smallcomps/loadingcircle'
const TokenHoldersCard = (props: any) => {

    const {loading, holders, symbol} = props

    const HolderCard = (props: any) => {

        const {holder, index} = props
        return(
            holder?.data?.info?.owner != null ?
            <a style={{width:120}}
                    href={`https://solscan.io/account/${holder?.data?.info?.owner}`} 
                    target="_blank" rel='noopener noreferrer'>
                    
                    <Card 
                    styles={{title:{}, header:{height:'100%', borderBottomWidth: 0, padding: 10}, 
                    }}
                    style={{width:"100%", height: 120, 
                    borderWidth: 3,
                    borderColor: holder?.data?.info?.owner == RAYDIUM_WALLET_ADD ? "blue" : holder?.pct > 20 ? "darkred" : "-moz-initial"}}
                    title={
                    <Flex vertical align="center">

                        <div style={{position:'absolute', top: -65}}>
                        {index == 0 && <FaCrown size={75} color="gold"/>}
                        </div>

                
                        <Flex style={{flexDirection:"column", alignItems:'center'}}>

                            <Text size="xxxl" style={{fontWeight:'bold'}}>
                                {index + 1}
                            </Text>

                            <Text size='sm' 
                            style={{height: "100%", fontWeight:'bolder', textDecoration:'underline'}}>
                                {holder?.data?.info?.owner == RAYDIUM_WALLET_ADD ? "RAYDIUM" : 
                                (holder?.data?.info?.owner)?.slice(0,4)+"..."+(holder?.data?.info?.owner)?.slice(holder?.data?.info?.owner?.length - 4,holder?.data?.info?.owner?.length)
                                }
                            </Text>
                        </Flex>



                        <Flex style={{width:"100%",
                            flexDirection:'column', alignItems:'center'}}>

                            <Text size="md" style={{fontWeight:'bold'}}>
                                {FormatNumber(holder?.uiAmount)}
                            </Text>
                            
                            <Text size="md" style={{color: 'red', fontWeight:'bold',
                                textTransform:'capitalize'}}>
                                {holder?.pct.toFixed(2)}%
                            </Text>
                        </Flex>

                    </Flex>}
                    >
                        
                </Card>
            </a>
            :
            <></>
        )
    }

  return (
    <Card 
        title={<Text size="xxl">Top 10 {symbol} Holders</Text>}
        style={{width: "500px", height: 700}}
        styles={{body: {padding: '40px 8px 8px 12px'}, title:{padding: 10}}}
        size="small"
        >
            {loading ? <Flex align='center' justify='center'><LoadingCircle/></Flex> 
            :
            <Flex gap={10} vertical style={{width:'100%', padding: 5, marginTop:20}}>
                <Flex align='center' justify='center' style={{width:'100%'}}>
                    <HolderCard
                    holder={holders?.[0]} index={0}/>
                </Flex>

                <Flex gap={10} align='center' justify='center' style={{width:'100%'}}>
                    {holders?.slice(1, 3)?.map((holder: any, index: any) => (
                        <HolderCard key={index + "fmwkl"}
                        holder={holder} index={index + 1}/>
                    ))}
                </Flex>

                <Flex gap={10}  align='center' justify='center' style={{width:'100%'}}>
                    {holders?.slice(3, 6)?.map((holder: any, index: any) => (
                        <HolderCard key={index + "fml"}
                        holder={holder} index={index + 3}/>
                    ))}
                </Flex>

                <Flex gap={10} align='center' justify='center' style={{width:'100%'}}>
                    {holders?.slice(6, 10)?.map((holder: any, index: any) => (
                        <HolderCard key={index + "fmwekl"}
                        holder={holder} index={index + 6}/>
                    ))}
                </Flex>
            </Flex>
            }
            
            {/* <List
            itemLayout="horizontal"
            dataSource={holders.slice(0,10)}
            renderItem={(item: any, index) => (
                <List.Item style={{}}> */}
                    {/* <a style={{width:'100%'}}
                     href={`https://solscan.io/account/${item?.data?.info?.owner}`} target="_blank" rel='noopener noreferrer'>

                    <Flex align="center" justify="space-between" style={{width:'100%'}}>

                        <Flex style={{flexDirection:'row', marginLeft: 10, gap:15, alignItems:'center'}}>

                            <Text size="xl" style={{fontWeight:'bold'}}>{index + 1}</Text>

                            <Text size='lg' style={{fontWeight:'bolder', textDecoration:'underline'}}>
                                {(item?.data?.info?.owner)?.slice(0,4)+"..."+(item?.data?.info?.owner)?.slice(item?.data?.info?.owner?.length - 4,item?.data?.info?.owner?.length)}
                                </Text>
                        </Flex>

                        <Flex style={{width:100,
                        flexDirection:'column', alignItems:'center',
                        marginRight: 10}}>

                            <Text size="md" style={{fontWeight:'bold'}}>
                                {FormatNumber(item.uiAmount)}
                            </Text>
                            
                            <Text size="md" style={{color: 'red', fontWeight:'bold',
                                textTransform:'capitalize'}}>
                                {item.pct.toFixed(2)}%
                            </Text>
                        </Flex>

                    </Flex>
                    </a> */}

                {/* </List.Item>
            )}
            /> */}
        
    </Card>
  )
}

export default TokenHoldersCard