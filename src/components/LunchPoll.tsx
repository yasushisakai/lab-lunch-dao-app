import LunchPollItem from './LunchPollItem';
import PollFooter from './PollFooter';
import { FC } from 'react';

type ILunchPollProps = {
    info: {
        id: string,
        topic_type: number,
        menu_list: IMenu[],
        vote_due: number,
        current_num_voted: number
    }
}

export type IMenu = {
    id: string,
    name: string,
    cost: number,
    foot_print: number
}

const LunchPoll: FC<ILunchPollProps> = ({info}:ILunchPollProps) => {
    console.log(info);
    const {menu_list, vote_due, current_num_voted} = info

    const quora = 15;

    const list = () =>
        // caters.map((c!) => (<LunchPollItem element={c}/>));
        menu_list.map((menu) => <LunchPollItem element={menu} />);

    //TODO: what to do with overflowing?
    return (<div className="h-full">
        <h1>Vote for lunch</h1>
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p className="flex-1">cuisine</p>
            <p> multiple choice</p>
        </div>
        <div className="flex flex-col space-y-8 mb-16 overflow-auto">
            {list()}
        </div>
        <div className="flex flex-row justify-end mb-10">
            <PollFooter due={vote_due} current_votes={current_num_voted} quora={quora} />
            <div className="card flex-none font-bold px-5 flex flex-col justify-center">submit</div>
        </div>
    </div>)
};

export default LunchPoll;