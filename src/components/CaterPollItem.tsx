import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CaterAccount } from "../model";
import { PublicKey } from "@solana/web3.js";

type ICaterPollItemProps = {
    id: PublicKey,
    cater: CaterAccount
    value: boolean,
    toggleFn: () => void
}

const CaterPollItem: FC<ICaterPollItemProps> = ({ id, cater, value, toggleFn }) => {
    const [myValue, setValue] = useState(false);

    useEffect(() => {
        setValue(value);
    }, [value])

    const { name } = cater;
    const endpoint = `/cater/${id.toBase58()}`;

    const toggle = () => {
        setValue(!myValue);
        toggleFn();
    }

    const renderIcon = () => {
        if (myValue) {
            return <FontAwesomeIcon icon={faCircleCheck} size="2x" />
        } else {
            return <div className="text-negative">
                <FontAwesomeIcon icon={faCircleXmark} size="2x" />
            </div>
        }
    };

    return (
        <div className="flex flex-row space-x-2">
            <div className="card flex-1 flex flex-col justify-center text-center">
                <Link to={endpoint}>
                    <div className="font-bold">{name}</div>
                </Link>
            </div>
            <div onClick={toggle} className="card flex flex-col justify-center">
                {renderIcon()}
            </div>
        </div>)
}

export default CaterPollItem;

