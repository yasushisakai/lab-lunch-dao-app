import { FC } from "react";
import { IMenu } from "../components/LunchPoll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

type ILunchPollItemProps = {
    element: IMenu
}

const LunchPollItem: FC<ILunchPollItemProps> = ({ element }) => {
    return (<div className="card flex flex-row space-x-5 py-3">
        <div className="flex-1 flex flex-col">
            <div className="font-bold">{element.name}</div>
            <div className="font-bold text-sm">${element.cost}</div>
        </div>
        <div className="flex flex-col text-center">
            <div className="font-bold">{element.foot_print}</div>
            <div className="text-xs">kgCo2E</div>
        </div>
        <div className="text-negative flex flex-col justify-center">
            <FontAwesomeIcon icon={faCircleXmark} size="2x" />
        </div>
    </div>)
}

export default LunchPollItem;