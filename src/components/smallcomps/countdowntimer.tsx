"use client"
import { Flex } from "antd";
import { useState, useEffect } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};


const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
      setTimeLeft(calculateTimeLeft(targetDate)); // Set initial time after mounting
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
  
      return () => clearInterval(timer);
    }, [targetDate]);
  
    if (!timeLeft) return <p>Loading...</p>; // Prevent hydration mismatch
  
    return (
      <div style={{width:"100%", height:70, textAlign: "center", fontSize: "2rem", backgroundColor:"#e84839", borderRadius: 12,
        paddingLeft: 10, paddingRight:10, paddingTop: 3
       }}>
        {/* <h2 style={{color:"red", fontSize: 40, fontWeight:900}}>GET READY</h2> */}
        {/* <p>
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </p> */}
        <Flex gap={20}>
            <Flex vertical align="center">
                <h6 style={{marginBlockEnd: 0, marginBlockStart:0, fontSize:".55em"}}>Days</h6>
                <p style={{marginBlockEnd: 0, marginBlockStart:0}}>{timeLeft.days}</p>
            </Flex>
            <Flex vertical align="center">
                <h6 style={{marginBlockEnd: 0, marginBlockStart:0, fontSize:".55em"}}>Hours</h6>
                <p style={{marginBlockEnd: 0, marginBlockStart:0}}>{timeLeft.hours}</p>
            </Flex>
            <Flex vertical align="center">
                <h6 style={{marginBlockEnd: 0, marginBlockStart:0, fontSize:".55em"}}>Minutes</h6>
                <p style={{marginBlockEnd: 0, marginBlockStart:0}}>{timeLeft.minutes}</p>
            </Flex>
            <Flex vertical align="center">
                <h6 style={{marginBlockEnd: 0, marginBlockStart:0, fontSize:".55em"}}>Seconds</h6>
                <p style={{marginBlockEnd: 0, marginBlockStart:0}}>{timeLeft.seconds}</p>
            </Flex>
        </Flex>
      </div>
    );
};

export default CountdownTimer