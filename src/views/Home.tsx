import { RouteComponentProps } from "@reach/router";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Home = (props: RouteComponentProps) => {
    return (<>
        <h1>Home</h1>
        <WalletMultiButton />
    </>)
};

export default Home;