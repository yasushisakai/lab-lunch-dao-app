import CaterPollItem from './CaterPollItem';
import PollFooter from './PollFooter';
import { FC } from 'react';

type ICaterPollProps = {
    info: {
        id: string,
        topic_type: number,
        cater_list: ICater[],
        vote_due: number,
        current_num_voted: number
    }
}

export type ICater = {
    id: string,
    name: string,
    last_used: number
}

const CaterPoll: FC<ICaterPollProps> = ({info}:ICaterPollProps) => {

    const {cater_list, vote_due, current_num_voted} = info

    const quora = 15;

    const list = () =>
        // caters.map((c!) => (<CaterPollItem element={c}/>));
        cater_list.map((cater) => <CaterPollItem element={cater} />);

    //TODO: what to do with overflowing?
    return (<div className="h-full">
        <h1>Approve Caters</h1>
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p className="flex-1">cuisine</p>
            <p> multiple choice</p>
        </div>
        <div className="flex flex-col space-y-8 mb-16 overflow-auto">
            {list()}
        </div>
        <div className="flex flex-row justify-end">
            <PollFooter due={vote_due} current_votes={current_num_voted} quora={quora} />
            <div className="card flex-none font-bold px-5 flex flex-col justify-center">submit</div>
        </div>
    </div>)
};

export default CaterPoll;