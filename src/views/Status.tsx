import data from "../dummy_data/stats.json";
import { shortenAddress } from "../utilities";
import PastVoteItem from "../components/PastVoteItem";
import { useContext } from "react";
import { WalletContext } from "../workspace";
import { Link } from "react-router-dom";
import config from "../config";

const Status = () => {

    const { address } = useContext(WalletContext);
    const meanDifference = data.footprint - data.average;
    let description = `you are ${meanDifference}kgCo2e higher then average.`
    if (meanDifference < 0) {
        description = `you are ${meanDifference}kgCo2e lower than average.`
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
                <div className="text-center text-3xl font-bold">{meanDifference} kgCo2e</div>
                <div>{adminLink()}</div>
                <p>{description}</p>
                <div className="flex flex-row justify-end">
                    <div className="card flex-none font-bold px-5 flex flex-col justify-center">submit</div>
                </div>
            </div>
        </>)
    } else {
        return (<>
            You need to connect your  wallet to participate! If you are accessing from a computer install the Phantom browser walllet extension. If you are from your smart phone, install Phantom wallet app.
        </>)
    }
};

export default Status;