import CaterPollItem from './CaterPollItem';
import PollFooter from './PollFooter';
import Finalize from './Finalize';
import { FC, useContext, useEffect, useState } from 'react';
import { Topic } from '../model';
import { WalletContext } from '../workspace';
import { PublicKey } from '@solana/web3.js';
import { CaterAccount } from '../model';
import { findAddress, stringToBytes } from '../util';
import Result from "./Result";

type ICaterPollProps = {
    topic: Topic
}

type ICater = {
    id: PublicKey,
    cater: CaterAccount,
}

const CaterPoll: FC<ICaterPollProps> = ({ topic }: ICaterPollProps) => {

    const { list: caterList, group, program, address } = useContext(WalletContext);
    const [caters, setCaters] = useState<ICater[]>([]);
    const [vote, setVote] = useState<boolean[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const fetchCaterOptions = async () => {
            if (program && caterList) {
                const caterListItems = await program.account.caterList.fetch(caterList);
                const c = await program.account.caterItem.all([{
                    memcmp: {
                        offset: 8,
                        bytes: caterList.toBase58()
                    }
                }]);
                console.log(c);
                let lookUp: { [index: string]: CaterAccount } = {};
                for (let i = 0; i < c.length; i++) {
                    lookUp[c[i].publicKey.toBase58()] = c[i].account;
                }
                // we don't know the order
                let ordered = caterListItems.caters.map(k => ({
                    id: k,
                    cater: lookUp[k.toBase58()]
                }));

                setCaters(ordered);
            }
        };

        const fetchIfVoted = async () => {
            if (program && address) {
                const [ballot] = await findAddress([stringToBytes("ballot"), address.toBuffer(), topic.publicKey.toBuffer()], program);
                try {
                    const ballotAccount = await program.account.ballot.fetch(ballot!);
                    setVote(ballotAccount.approvals);
                    setMessage("already voted");
                    setButtonDisabled(true);
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

        fetchCaterOptions();
        fetchIfVoted();


    }, [program, caterList, address, topic]);

    const toggleFn = (i: number) => {
        let newVote = [...vote];
        newVote[i] = !newVote[i];
        setVote(newVote);
    }


    const list = () =>
        caters.map((c, i) => <CaterPollItem id={c.id} cater={c.cater} value={vote[i]} toggleFn={() => { toggleFn(i) }} />);

    const submitVote = async () => {
        if (program && address && group) {
            const [ballot] = await findAddress([stringToBytes("ballot"), address.toBuffer(), topic.publicKey.toBuffer()], program);
            await program.methods.vote(vote).accounts({
                ballot,
                group,
                topic: topic.publicKey,
                voter: address
            }).rpc()
            setButtonDisabled(true);
        }
    };

    const renderResults = () => {
        if (topic.finalized) {
            return (<Result topic={topic.publicKey} names={caters.map(c => c.cater.name)} />)
        }
    }

    //TODO: what to do with overflowing?
    return (<div className="h-full">
        <h1>{topic.name}</h1>
        <div>{topic.description}</div>
        {renderResults()}
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p className="flex-1">cuisine</p>
            <p> multiple choice</p>
        </div>
        <div className="flex flex-col space-y-8 mb-16 overflow-auto">
            {list()}
        </div>
        <div className="text-negative text-center text-xs font-bold mb-3">{message}</div>
        <div className="flex flex-row justify-end">
            <PollFooter due={topic.voteDue.toNumber()} current_votes={topic.voteNum} quora={topic.quorum} />
            <button onClick={submitVote} className="card flex-none font-bold px-5 flex flex-col justify-center disabled:card-disabled" disabled={buttonDisabled}>submit</button>
        </div>
        <Finalize topic={topic} />
    </div>)
};

export default CaterPoll;