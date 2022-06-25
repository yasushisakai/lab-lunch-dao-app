import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {MenuItem} from '../model';

type ILunchPollItemProps = {
    menu: MenuItem
    value: boolean
    toggleFn: ()=>void
}

const LunchPollItem: FC<ILunchPollItemProps> = ({ menu, value, toggleFn }) => {
    const [myValue, setValue] = useState(false);

    useEffect(()=>{
        setValue(value);
    },[value])

    const toggle = () => {
        setValue(!myValue);
        toggleFn();
    }

    const renderIcon = ()=>{
        if(myValue) {
            return <FontAwesomeIcon icon={faCircleCheck} size="2x" />
        } else {
            return <div className="text-negative">
            <FontAwesomeIcon icon={faCircleXmark} size="2x" />
            </div>
        }
    }

    return (<div className="card flex flex-row space-x-5 py-3">
        <div className="flex-1 flex flex-col">
            <div className="font-bold">{menu.name}</div>
            <div className="font-bold text-sm">${menu.cost}</div>
        </div>
        <div className="flex flex-col text-center">
            <div className="font-bold">{menu.footPrint.toFixed(2)}</div>
            <div className="text-xs">kgCo2E</div>
        </div>
        <div onClick={toggle} className="flex flex-col justify-center">
            {renderIcon()}
        </div>
    </div>)
}

export default LunchPollItem;