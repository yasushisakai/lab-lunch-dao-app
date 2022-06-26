import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Wrapper from '../components/Wrapper';

const Home = () => {
    return (<Wrapper>
        <div className="flex flex-col justify-center">
            <div id="title" className="text-center">BENTO DAO</div>
            <p className="text-center text-sm mb-10">share lunch, space and time.</p>
            <p className="text-sm text-justify">BENTO (Bistro Energy NeT 0) is an educational DAO (Decentralized Autonomous Organization) where everyone decides on the blockchain what to have for lunch at work or with workmates. While we're at it, we can learn about eco-friendly meal options. You can learn about the project <Link to="project">here</Link></p>
        </div>
        <div className="flex flex-col space-y-2">
            <h2>How to participate:</h2>
            <p className="text-sm text-justify">BENTO runs on a environmental friendly, cheap and fast blockchain called Solana. Applications running on the blockchain interact with the user through a wallet. This means you need to install a wallet. If you are working on a computer, use <a href="https://phantom.app/download">this browser extension</a>, and from a smartphone or tablet, install the Phantom wallet application and come back here again from the built-in browser.</p>
            <p className="text-sm text-justify">When you are ready, click the button below to connect your wallet.</p>
            <div className="flex flex-row justify-center">
                <WalletMultiButton />
            </div>
        </div>
    </Wrapper>)
};

export default Home;