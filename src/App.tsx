import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';

import Home from './views/Home';
import List from './views/List';
import Propose from './views/Propose';
import Status from './views/Status';
import Topic from './views/Topic';
import ProposeLunch from './views/ProposeLunch';
import ProposeCater from './views/ProposeCater';
import Cater from './views/Cater';
import { WalletType, WalletContext } from './workspace';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line        
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {

    const { publicKey } = useWallet();
    const context = {address: publicKey} as WalletType;

    return (
        <BrowserRouter>
        <WalletContext.Provider value={context}>
        <div className="h-screen">
            <Navigation />
            <div id="content">
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<List />} path="list" />
                        <Route element={<Propose />} path="propose" />
                        <Route element={<ProposeLunch />} path="propose/lunch" />
                        <Route element={<ProposeCater />} path="propose/cater" />
                        <Route element={<Topic />} path="topic/:topicId"/>
                        <Route element={<Cater />} path="cater/:caterId"/>
                        <Route element={<Status />} path="status" />
                    </Routes>
            </div>
        </div>
        </WalletContext.Provider>
        </BrowserRouter>
    );
};
