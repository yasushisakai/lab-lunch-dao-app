import { useParams } from "react-router-dom";
import data from "../dummy_data/cater_menu.json";
import CaterMenuItem from "../components/CaterMenuItem";

const Cater = () => {

    const { caterId } = useParams();

    const menu = () => data.menu.map(m=><CaterMenuItem menu={m}/>);

    return (<div className="flex flex-col space-y-4">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <div className="flex flex-col space-y-3">
            {menu()}
        </div>
    </div>)
};

export default Cater;