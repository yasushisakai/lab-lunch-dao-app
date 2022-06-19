import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ICater } from '../components/CaterPoll';

type ICaterPollItemProps = {
    element: ICater
}

const CaterPollItem: FC<ICaterPollItemProps> = ({ element }) => {
    const { id, name, last_used } = element;
    const endpoint = `/cater/${id}`;
    return (
        <div className="card flex flex-row">
            <div className="flex-1 flex flex-col justify-center">
            <Link to={endpoint}>
                <div className="font-bold">{name}</div>
            </Link>
            </div>
            <div className="text-negative">
            <FontAwesomeIcon icon={faCircleXmark} size="2x" />
            </div>
        </div>)
}

export default CaterPollItem;

