import { FC } from "react";
import { IMenu } from "./LunchPoll";


type ICaterMenuItem = {
    menu: IMenu
}

const CaterMenuItem: FC<ICaterMenuItem> = ({ menu }) => {
    return (<div className="card flex flex-row space-x-8 py-2.5">
            <div className="flex-1 font-bold flex flex-col justify-center">{menu.name}</div>
            <div className="font-bold flex flex-col justify-center">${menu.cost}</div>
        <div className="flex flex-col text-center">
            <div className="font-bold">{menu.foot_print}</div>
            <div className="text-xs">kgCo2E</div>
        </div>
    </div>)
};


export default CaterMenuItem;