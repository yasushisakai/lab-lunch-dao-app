import { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


type Item = {
    id: string,
    topic: number,
    which_lunch?: number,
    due: number,
    voted: string[]
}

type ITopicListItemProps = {
    element: Item,
    walletAddress: string, // users public key
}

const TopicListItem: FC<ITopicListItemProps> = ({ element, walletAddress }) => {
    const { id, topic, which_lunch, due, voted } = element;

    const didVote = voted.includes(walletAddress) ?
        <FontAwesomeIcon icon={faCircleCheck} size="2x" /> :
        <span className="text-negative">
            <FontAwesomeIcon icon={faCircleXmark} size="2x" />
        </span>;

    let what = 'update';
    let text = 'cater list';
    if (topic === 0) {
        what = 'vote lunch menu for';
        const date = new Date(which_lunch!);
        text = date.toDateString();
    }

    //TODO: Date.now() can be unreliable
    const timeLeftInHours = ((due - Date.now().valueOf() / 1000) / 3600).toFixed();

    const endpoint = `/topic/${id}`;

    return (
        <Link to={endpoint}>
            <div className="card">
                <div className="flex flex-row space-x-2">
                    <div className="flex flex-col justify-center">{didVote}</div>
                    <div className="flex-1 flex flex-col">
                        <p className="text-sm">{what}</p>
                        <p className="font-bold">{text}</p>
                    </div>
                    <div className="flex flex-col text-sm justify-center">
                        <p className="font-bold">{timeLeftInHours}</p>
                        <p>hours</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TopicListItem;