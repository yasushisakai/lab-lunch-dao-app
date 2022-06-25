import { useParams } from "react-router-dom";
import CaterPoll from "../components/CaterPoll";
import LunchPoll from "../components/LunchPoll";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../workspace";
import { PublicKey } from "@solana/web3.js";
import { Topic as TopicItem } from "../model";

const Topic = () => {

    const { topicId } = useParams();
    const { program } = useContext(WalletContext);
    const [topic, setTopic] = useState<null | TopicItem>(null);

    useEffect(() => {
        const fetchTopic = async () => {
            if (program && topicId) {
                const publicKey = new PublicKey(topicId);
                const topicAccount = await program.account.topic.fetch(new PublicKey(topicId));
                const { name, description, voteDue, seqNo, options, quorum, finalized, voteNum } = topicAccount;
                const t = { publicKey, name, description, voteDue, seqNo, options, quorum, finalized, voteNum } as TopicItem;
                setTopic(t);
            }
        }
        // fetch the topic
        fetchTopic();
    }, [program, topicId]);

    if (topic) {
        if (topic.name === "Cater Poll") {
            return <CaterPoll topic={topic} />
        } else {
            return <LunchPoll topic={topic} />
        }
    } else {
        return (<div>cannot load topic</div>)
    }
};

export default Topic;