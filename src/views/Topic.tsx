import data from "../dummy_data/polls.json";
import { useParams } from "react-router-dom";
import CaterPoll from "../components/CaterPoll";
import LunchPoll from "../components/LunchPoll";

const Topic = () => {

    const { topicId } = useParams();

    // get topic info from topicId
    const info: any = data.find((e)=> e.id === topicId);

    console.log(info);

    if(info!.topic_type === 1)  {
        return <CaterPoll info={info}/>
    } else {
        return <LunchPoll info={info} />
    }
 };

export default Topic;