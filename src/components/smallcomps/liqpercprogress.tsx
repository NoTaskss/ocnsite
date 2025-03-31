import { Flex, Progress } from 'antd'
import React from 'react'
import { Text } from '../text'
import { FaLock, FaLockOpen } from 'react-icons/fa'

const LiqPercProgress = (props: any) => {

    const {percent, open, hidePerc, size, vertical} = props

    const lockedLiqPerc = percent
    
    const circleSize = size ? size : 50

  return (
    <Flex vertical={vertical} align='center' justify='center' gap={10}>
        <Progress type="circle" size={circleSize}
        status={lockedLiqPerc <= 50 ? "exception" : lockedLiqPerc <= 80 ? "active" : "success"}
        percent={lockedLiqPerc}//{100 - extra?.unlockedLiqPct.toFixed(2)} 
        format={() => 
            !open ?
        <FaLock size={circleSize / 2}/>
        :
        <FaLockOpen size={circleSize / 2}/>
        } />

        {!hidePerc &&
        <Text size="lg" style={{fontWeight:'bold'}}>
            {lockedLiqPerc?.toFixed(2)}%
        </Text>
        }
    </Flex>
    
  )
}

export default LiqPercProgress