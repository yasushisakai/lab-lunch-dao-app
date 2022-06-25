import { shortenAddress } from "../utilities";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../workspace";
import { Link } from "react-router-dom";
import config from "../config";
import { PublicKey } from "@solana/web3.js";

const Status = () => {

    const { address, program } = useContext(WalletContext);
    const [topics, setTopics] = useState<PublicKey[]>([]);

    useEffect(()=>{
        const fetchBallots = async () => {
            if(program && address) {
                const ballotData = await program.account.ballot.all([{
                    memcmp:{
                        offset: 40,
                        bytes: address.toBase58()
                    }
                }]);
                setTopics(ballotData.map(b=>b.account.topic));
            }
        };
        fetchBallots();
    },[program, address]);

    const renderTopicLinks = () => {
        return topics.map(t=>{
            const url = `../topic/${t.toBase58()}`
            return(<Link to={url}>topic</Link>)
        });
    }


    const adminLink = () => {
        if (address?.toBase58() === config.admin) {
            return (<Link to="../admin">admin</Link>)
        }
    }

    if (address !== null) {
        return (<>
            <h1>'{shortenAddress(address)}'</h1>
            <div className="flex flex-col space-y-5">
                <div>{adminLink()}</div>
                {renderTopicLinks()}
            </div>

        </>)
    } else {
        return (<>
            You need to connect your  wallet to participate! If you are accessing from a computer install the Phantom browser walllet extension. If you are from your smart phone, install Phantom wallet app.
        </>)
    }
};

export default Status;