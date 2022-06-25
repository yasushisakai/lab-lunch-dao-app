import NamespaceFactory from '@project-serum/anchor/dist/cjs/program/namespace';
import { PublicKey } from '@solana/web3.js';
import { setDefaultResultOrder } from 'dns';
import { FC, useContext, useEffect, useState } from 'react';
import { TopicType } from '../model';
import { aggregateResult, findAddress, stringToBytes } from '../util';
import { WalletContext } from '../workspace';


type ResultProps = {
    topic: PublicKey
    names: string[]
};

const Result: FC<ResultProps> = ({ topic, names }) => {

    const { program } = useContext(WalletContext);
    const [result, setResult] = useState<string[][]>([]);

    useEffect(() => {
        fetchResultAddress();
    }, [program, result]);

    const fetchResultAddress = async () => {
        if (program) {
            const [k, _b] = await findAddress([stringToBytes("result"), topic.toBuffer()], program)
            const { votes } = await program.account.finalizedTopic.fetch(k);
            setResult(aggregateResult(names, votes as number[]));
        }
    }

    if (result.length > 0) {
        return (
            <div>
                <h2>Results</h2>
                <div>winner(s): {result[0].join(', ')}</div>
            </div>)
    } else {
        return <div>loading result</div>
    }
}

export default Result;