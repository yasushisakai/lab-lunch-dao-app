import { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Topic } from '../model';
import { WalletContext } from "../workspace";
import { findAddress, stringToBytes } from "../util";


type ITopicListItemProps = {
    topic: Topic,
}

const TopicListItem: FC<ITopicListItemProps> = ({ topic }) => {

    const { publicKey, voteDue, name, description, finalized } = topic;
    const [voted, setVoted] = useState(true);
    const { address, program } = useContext(WalletContext);

    useEffect(() => {
        fetchIfVoted();
    })

    const fetchIfVoted = async () => {
        if (program && address) {
            const [ballot] = await findAddress([stringToBytes("ballot"), address.toBuffer(), topic.publicKey.toBuffer()], program);
            try {
                await program.account.ballot.fetch(ballot);
                setVoted(true);
            } catch {
                setVoted(false);
            }
        }
    }

    const due = voteDue.toNumber() * 1000 < (new Date()).valueOf();

    const status = () => {
        if (finalized) {
            return (<div className="flex flex-col justify-between space-y-1 text-fixed">
                <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                <div className="text-xs text-center">fixed</div>
            </div>);
        } else if (due) {
            return (<div className="flex flex-col justify-center space-y-1 text-negative">
                <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                <span className="text-xs text-center">closed</span>
            </div>);
        } else if (voted) {
            return (<div className="flex flex-col justify-center space-y-1">
                <FontAwesomeIcon icon={faCircleCheck} size="2x" />
                <span className="text-xs text-center">voted</span>
            </div>);
        } else {
            return (<div className="flex flex-col justify-center space-y-1">
                <FontAwesomeIcon icon={faCircle} size="2x" />
                <span className="text-xs text-center">open</span>
            </div>);
        }
    }

    //TODO: Date.now() can be unreliable
    const timeLeftInHours = ((voteDue.toNumber() * 1000 - Date.now().valueOf()) / 3600000).toFixed();

    const endpoint = `/topic/${publicKey}`;

    return (
        <Link to={endpoint}>
            <div className="card">
                <div className="flex flex-row space-x-3">
                    <div className="flex flex-col justify-center">{status()}</div>
                    <div className="flex-1 flex flex-col">
                        <p className="text-sm">{description}</p>
                        <p className="font-bold">{name}</p>
                    </div>
                    <div className="flex flex-col text-sm justify-center">
                        <p className="font-bold text-center">{timeLeftInHours}</p>
                        <p>hours</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TopicListItem;