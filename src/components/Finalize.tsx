import { PublicKey } from "@solana/web3.js";
import { FC, useContext, useEffect, useState } from "react";
import config from "../config";
import { Topic } from "../model";
import { findAddress, stringToBytes } from "../util";
import { WalletContext } from "../workspace";

type FinalizeProps = {
    topic: Topic,
}

const Finalize: FC<FinalizeProps> = ({ topic }) => {
    const { address, program, group } = useContext(WalletContext);
    const [disabled, setDisabled] = useState(true);
    const [ballots, setBallots] = useState<PublicKey[]>([]);

    useEffect(() => {
        checkFinal();
    }, []);

    const checkFinal = async () => {
        if (!topic.finalized && 
            topic.voteDue.toNumber()*1000 < (new Date()).valueOf() &&
            topic.voteNum >= topic.quorum) {
            setDisabled(false);
            await fetchBallots();
        }
    }

    const fetchBallots = async () => {
        if (program) {
            const ballotAccounts = await program.account.ballot.all([{
                memcmp: {
                    offset: 8,
                    bytes: topic.publicKey.toBase58()
                }
            }]);
            setBallots(ballotAccounts.map(ba => ba.publicKey));
        }
    };

    const finalize = async () => {
        if(program && group && address) {
            const [result, _rBump] = await findAddress([stringToBytes("result"), topic.publicKey.toBuffer()], program)
            setDisabled(true);
            await program.methods.finalizeTopic().accounts({
            topic: topic.publicKey,
            result,
            group,
            payer: address,
        })
            .remainingAccounts(ballots.map(
                b => ({ pubkey: b, isWritable: false, isSigner: false })))
            .rpc();
        }
    };

    if (address && address.toBase58() === config.admin) {
        return (
            <button disabled={disabled} onClick={finalize} className="card disabled:card-disabled">Finalize</button>
        )
    } else {
        return <></>;
    }
}

export default Finalize;