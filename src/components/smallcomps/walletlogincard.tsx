import React from 'react'
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const WalletLoginCard = (props: any) => {

  const { connected, disconnecting } = useWallet();
  
  return (
    <WalletMultiButtonDynamic>{!connected && "Connect Wallet"}</WalletMultiButtonDynamic>
  )
}

export default WalletLoginCard