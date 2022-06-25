import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Connection, PublicKey } from '@solana/web3.js';
import { FC, ReactNode, useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';

import Home from './views/Home';
import Admin from './views/Admin';
import List from './views/List';
import Propose from './views/Propose';
import Status from './views/Status';
import Topic from './views/Topic';
import ProposeLunch from './views/ProposeLunch';
import ProposeCater from './views/ProposeCater';
import Cater from './views/Cater';
import { WalletType, WalletContext, emptyContext } from './workspace';
import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import config from './config';
import { LabLunchDao, IDL } from './types/lab_lunch_dao';
import { stringToBytes, findAddress } from './util';

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
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    // const endpoint = 'https://129.0.0.1:8899';

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
        <ConnectionProvider endpoint={config.endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {

    const [context, setContext] = useState(emptyContext);
    const { publicKey, signTransaction, signAllTransactions } = useWallet();

    useEffect(() => {
        if (publicKey) {
            // const wallet = useAnchorWallet();
            const commitment = 'processed';
            const connection = new Connection(config.endpoint, commitment);
            console.log(`using endpoint: ${config.endpoint}`);

            const wallet = {
                publicKey,
                signTransaction,
                signAllTransactions
            };

            const provider = new AnchorProvider(
                connection,
                wallet as Wallet,
                { preflightCommitment: 'processed', commitment }
            );

            const programId = new PublicKey(config.programId);
            const program = new Program(IDL, programId, provider) as Program<LabLunchDao>

            findAddresses(program, publicKey)
        }
    }, [publicKey, signTransaction, signAllTransactions]);

    const findAddresses = async (program: Program<LabLunchDao>, publicKey: PublicKey) => {
        const [group] = await findAddress([stringToBytes("group"), stringToBytes(config.groupName)], program);
        const [list] = await findAddress([stringToBytes("cater_list"), group.toBuffer()], program);
        setContext({ address: publicKey, program, group, list } as WalletType)
    }

    return (
        <BrowserRouter>
            <WalletContext.Provider value={context}>
                <div className="h-screen">
                    <Navigation />
                    <div id="content">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Admin />} path="/admin" />
                            <Route element={<List />} path="list" />
                            <Route element={<Propose />} path="propose" />
                            <Route element={<ProposeLunch />} path="propose/lunch" />
                            <Route element={<ProposeCater />} path="propose/cater" />
                            <Route element={<Topic />} path="topic/:topicId" />
                            <Route element={<Cater />} path="cater/:caterId" />
                            <Route element={<Status />} path="status" />
                        </Routes>
                    </div>
                </div>
            </WalletContext.Provider>
        </BrowserRouter>
    );
};
