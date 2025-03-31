import { useEffect, useState } from "react";
import { ShortenPublicKeyString } from "../../utils/numberutils";
import { useGlobalContext } from "../../contexts";

const PhantomSignInButton = (props: any) => {

    const { phantomConnected, setPhantomConnected } = useGlobalContext();

    const [isConnected, setIsConnected] = useState(false)

    
    async function HandleConnect(){
        console.log("CONNECTING")
        if (!props?.provider){
            console.log("NO PROVIDER")
            return;
        }
    
        try {
          await props?.provider.connect();
          
          console.log("DONE CONNECT PROVIDER")
        } catch (error) {
            console.log("ERROR CONNECTING TO PHANTOM WALLET")
        }

        console.log("END CONNECTING")
    }

    async function handleDisconnect() {
        if (!props?.provider) return;
    
        try {
          await props?.provider.disconnect();

        } catch (error) {
            console.log("ERROR DISCONNECTING PHANTOM WALLET")
        }
    }
    
  
  return (
    <>
    {!props?.provider?.isConnected ?
    <button onClick={() => HandleConnect()} 
    style={{width:180, height:60}}>
        Connect Wallet
    </button>
    :
    <button onClick={() => handleDisconnect()} 
    style={{width:180, height:60}}>
        Disconnect {ShortenPublicKeyString(props?.provider?.publicKey?.toString())}
    </button>
    }
    </>
  )
}

export default PhantomSignInButton