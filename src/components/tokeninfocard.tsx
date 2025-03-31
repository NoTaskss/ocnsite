import { Card, Flex } from 'antd'
import React from 'react'
import { Text } from './text'
import { FormatNumber } from "../utils/numberutils"
import { FaCheck, FaExclamationTriangle} from 'react-icons/fa'
import LiqPercProgress from './smallcomps/liqpercprogress'
import LoadingCircle from './smallcomps/loadingcircle'

const TokenInfoCard = (props: any) => {

    const {loading, markets, info, extra, prices, symbol} = props

    var lockedLiqPerc = extra?.lockedLiqPerc  //extra?.unlockedLiqPct ? (100 - extra?.unlockedLiqPct) : 0

  return (
    <Card 
        title={<Text size="xxl">{symbol} Info</Text>}
        style={{ width: "500px", height: 700}}
        styles={{body: {padding: '20px 8px 20px 12px'}, title:{padding: 10}}}
        
        >
            {loading ? <Flex align='center' justify='center'><LoadingCircle/></Flex> 
            :
            <Flex gap={10} wrap='wrap' align='center' justify='center'>
                
                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                
                        <Text size="xl" style={{fontWeight:'bold'}}>MINT</Text>
                    
                        <Text size="xl" style={{fontWeight:'bold', textDecoration:'underline'}}>
                            {(info?.mint?.publicKey)?.slice(0,4)+"..."+(info?.mint?.publicKey)?.slice(info?.mint?.publicKey?.length - 4,info?.mint?.publicKey?.length)}
                        </Text>
                        
                    </Flex>
                </Card>

                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            SUPPLY
                        </Text>
                    
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            {FormatNumber(prices?.tokenTotalSupply, 0)
                            }
                        </Text>
                    
                    </Flex>
                </Card>

                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            CREATOR
                        </Text>
                    
                        <Text size="xl" style={{fontWeight:'bold', textDecoration:'underline'}}>
                            {(info?.metadata?.updateAuthority)?.slice(0,4)+"..."+(info?.metadata?.updateAuthority)?.slice(info?.metadata?.updateAuthority?.length - 4,info?.metadata?.updateAuthority?.length)}
                        </Text>
                    
                    </Flex>
                </Card>

                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            MARKET CAP
                        </Text>
                    
                        <Text size="xl" style={{fontWeight:'bold'}}>
                        ${FormatNumber(markets?.[0]?.lp?.poolMarketCap, 2)//FormatNumber(prices?.marketCap, 2)
                        }
                        </Text>
                    
                    </Flex>
                </Card>


                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                    
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            MINT AUTH
                        </Text>

                        <Flex align='center' justify='center' gap={10}>
                        {info?.mint?.mintAuthority?.value == "11111111111111111111111111111111" ? 
                            <FaCheck size={30} 
                            color={"green"}/> : 
                            info?.mint?.mintAuthority?.value ? 
                            <FaExclamationTriangle size={30} color='red'/>
                            :
                            <FaCheck size={30} 
                            color={"green"}
                            />
                        }
                        
                            <Text size="xl" style={{fontWeight:'bold', 
                            color: info?.mint?.mintAuthority?.value ? info?.mint?.mintAuthority?.value != "11111111111111111111111111111111" ? 'red' : 'green' : "green"}}>
                                {info?.mint?.mintAuthority ? info?.mint?.mintAuthority?.value ?
                                (info?.mint?.mintAuthority?.value).slice(0,4)+"..."+(info?.mint?.mintAuthority?.value)?.slice(info?.mint?.mintAuthority?.value?.length - 4,info?.mint?.mintAuthority?.value?.length) :
                                "Revoked" 
                                :
                                "Revoked" }
                            </Text>
                        </Flex>
                    
                    </Flex>
                </Card>

                <Card style={{width:"45%", justifyContent:'space-between'}}>
                    <Flex vertical gap={10} align='center' justify='space-between'>
                    
                        <Text size="xl" style={{fontWeight:'bold'}}>
                            LP LOCKED %
                        </Text>

                        <LiqPercProgress percent={lockedLiqPerc} size={40}/>
                    
                    </Flex>
                </Card>

        </Flex>
        }
        
    </Card>
  )
}

export default TokenInfoCard


