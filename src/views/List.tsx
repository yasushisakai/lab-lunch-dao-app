import data from '../dummy_data/list_view.json';
import TopicListItem from '../components/TopicListItem';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../workspace';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
import {Topic} from "../model";

const List = () => {

    const { address, group, list: cater_list, program } = useContext(WalletContext);
    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(() => {
        if (!program || !address || !group) return;

        fetchTopics();

    }, [program, address, group]);

    const fetchTopics = async () => {
        if (program && group) {
            const topicAccounts = await program.account.topic.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: group.toBase58()
                    }
                }
            ]);

            topicAccounts.sort((a,b)=>{
                if(a.account.finalized && !b.account.finalized) {
                    return 1;
                } else if (!a.account.finalized && b.account.finalized) {
                    return -1;
                } else {
                    const aElapsed = (a.account.voteDue.toNumber()*1000) - (new Date()).valueOf()
                    const bElapsed = (b.account.voteDue.toNumber()*1000) - (new Date()).valueOf()

                    if(aElapsed > 0 && bElapsed < 0) {
                        return -1;
                    } else if (aElapsed < 0 && bElapsed > 0) {
                        return 1;
                    } else {
                        if(aElapsed > bElapsed) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }

                }
            })

            

            let tpcs: Topic[]= topicAccounts.map(t => {
                const {publicKey, account} = t;
                const {name, voteDue, voteNum, options, seqNo, quorum, description, finalized} = account;
                return ({publicKey, name, description, voteDue, voteNum, quorum, options, finalized, seqNo } as Topic)
            })

            setTopics(tpcs);

        }
    };

    const myKey = 'key-a';

    const list = () =>
        topics.map(topic => {
            return (<TopicListItem key={topic.publicKey.toBase58()} topic={topic} walletAddress={myKey} />)
        });

    return (<>
        <h1>Topic List</h1>
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p>status</p>
            <p className='flex-1'>| topic</p>
            <p>time left</p>
        </div>
        <div className="flex flex-col space-y-4">
            {list()}
        </div>
    </>)
};

export default List;