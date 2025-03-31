import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import type { AppProps } from 'next/app';
import type { FC} from 'react';
import React, { createContext, useCallback, useMemo, useState  } from 'react';
import { App as AntdApp, Layout } from "antd";
import { ColorModeContextProvider } from '../contexts/color-mode';
import Head from 'next/head';
import { type SolanaSignInInput } from '@solana/wallet-standard-features';
import { verifySignIn } from '@solana/wallet-standard-util';
import type { Adapter, WalletError } from '@solana/wallet-adapter-base';
import { GlobalContextProvider } from '../contexts/globalcontext';

const { Content } = Layout
// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {

    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;
    //WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint: any = useMemo(() => process.env.NEXT_PUBLIC_QUICKNODE_RPC_API
    , []);
    //clusterApiUrl(network), []);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter()
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );
        
    // const autoSignIn = useCallback(async (adapter: Adapter) => {
    //     if (!('signIn' in adapter)) return true;

    //     const input: SolanaSignInInput = {
    //         domain: window.location.host,
    //         address: adapter.publicKey ? adapter.publicKey.toBase58() : undefined,
    //         statement: 'Hello, Sign in to Smool.',
    //     };
    //     const output = await adapter.signIn(input);

    //     if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');

    //     return false;
    // }, []);

    return (
        <ColorModeContextProvider>
            <Head>
                <title>Offical Crypto Nostra</title>
                <meta name="description" content="Offical Crypto Nostra" />
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
                <link rel="icon" href="/ocnfav.png" />

                {/* Open Graph (Facebook) */}
                <meta property="og:title" content="Offical Crypto Nostra" />
                <meta property="og:description" content="Dive Into The World Of Crypto Nostra." />
                <meta property="og:image" content="/ocnshare.png" />
                <meta property="og:url" content="https://officialcryptonostra.com" />
                <meta property="og:type" content="website" />
            </Head>
        <AntdApp style={{backgroundColor:'black', display:'flex'}}>
            <GlobalContextProvider>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider 
                wallets={wallets} 
                onError={(e) => console.log("ERROR WITH WALLET ", e)}
                //autoConnect={autoSignIn}
                >
                    <WalletModalProvider>
                        <Layout>
                            {/* <SideBarNavComp/> */}
                            {/* <HeaderBarComp /> */}
                            <Content>
                                <Component {...pageProps} />
                            </Content>
                        </Layout>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
            </GlobalContextProvider>
        </AntdApp>
        </ColorModeContextProvider>
    );
};

export default App;
