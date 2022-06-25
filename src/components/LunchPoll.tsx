import LunchPollItem from './LunchPollItem';
import PollFooter from './PollFooter';
import { FC, useContext, useEffect, useState } from 'react';
import { Topic, MenuItem } from '../model';
import { WalletContext } from '../workspace';
import { PublicKey } from '@solana/web3.js';
import { findAddress, stringToBytes } from '../util';
import Finalize from './Finalize';
import Result from './Result';

type ILunchPollProps = {
    topic: Topic
}

const LunchPoll: FC<ILunchPollProps> = ({ topic }) => {
    const { program, address, group } = useContext(WalletContext);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [vote, setVote] = useState<boolean[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTopicOptions();
        fetchIfVoted();
    }, [])

    const fetchTopicOptions = async () => {
        if (program) {
            const ms = topic.options.map(o => program.account.menuItem.fetch(o));
            // Promise.all preserves the order of the original array
            const its = await Promise.all(ms);
            setVote(its.map(_v => false));
            setItems(its);
        }
    }

    const fetchIfVoted = async () => {
        if (program && address) {
            const ballot = await ballotAddress();
            try {
                const ballotAccount = await program.account.ballot.fetch(ballot!);
                console.log(ballotAccount.approvals);
                setVote(ballotAccount.approvals);
                setButtonDisabled(true);
                setMessage("aleady voted");
            } catch {
                let emptyVote = new Array(topic.options.length);
                emptyVote.fill(false);
                setVote(emptyVote);
                if (topic.voteDue.toNumber() * 1000 > (new Date()).valueOf()) {
                    setButtonDisabled(false);
                } else {
                    setMessage("poll closed");
                }
            }
        }
    }

    const handleItemClick = (index: number) => {
        // deepcopy
        const newVote = [...vote];
        newVote[index] = !newVote[index]
        setVote(newVote);
    }

    const ballotAddress = async () => {
        if (address && program) {
            const [ballot, _] = await findAddress([stringToBytes("ballot"), address.toBuffer(), topic.publicKey.toBuffer()], program);
            return ballot
        }
    }

    const { name, description } = topic;
    // const quora = 15;

    const list = () => items.map((m, i) => (<LunchPollItem menu={m} value={vote[i]} toggleFn={() => { handleItemClick(i) }} />));
    // menu_list.map((menu) => <LunchPollItem element={menu} />);

    const submitVote = async () => {
        console.log(vote);
        const ballot = await ballotAddress();
        if (program && address && group) {
            await program.methods.vote(vote).accounts({
                ballot: ballot!,
                group,
                topic: topic.publicKey,
                voter: address
            }).rpc()
            setButtonDisabled(true);
        }
    }

    const renderResults = () => {
        if (topic.finalized) {
            return (<Result topic={topic.publicKey} names={items.map(i => i.name)} />)
        }
    }

    //TODO: what to do with overflowing?
    return (<div className="h-full">
        <h1>{name}</h1>
        <div>{description}</div>
        {renderResults()}
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p className="flex-1">cuisine</p>
            <p> multiple choice</p>
        </div>
        <div className="flex flex-col space-y-8 mb-16 overflow-auto">
            {list()}
        </div>
        <div className="text-negative text-center text-xs font-bold mb-3">{message}</div>
        <div className="flex flex-row justify-end mb-10">
            <PollFooter due={topic.voteDue.toNumber()} current_votes={topic.voteNum} quora={topic.quorum} />
            <button disabled={buttonDisabled} onClick={submitVote} className="card flex-none font-bold px-5 flex flex-col justify-center disabled:card-disabled">submit</button>
        </div>
        <Finalize topic={topic} />
    </div>)
};

export default LunchPoll;