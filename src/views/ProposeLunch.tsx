import data from "../dummy_data/create_lunch_poll.json";

const ProposeLunch = () => {

    const options = () => data.map((o: any) => (<option>{o.name}</option>));

    return (<>
        <h1>Plan a Lunch</h1>

        <div className="flex flex-col space-y-5 mt-5">
            <div className="flex flex-col">
                <p className="font-bold text-lg">this is a lunch for:</p>
                <p>date:</p>
                <input type="date" />
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-lg">people can vote until:</p>
                <p>date:</p>
                <input type="date" />
                <p>time:</p>
                <input type="time" />
            </div>
            <div className="flex flex-col">
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-lg">cuisine:</p>
                <select>
                    {options()}
                </select>
            </div>
            <div className="flex flex-row justify-end">
                <div className="card flex-none font-bold px-5">submit</div>
            </div>
        </div>

    </>)
};

export default ProposeLunch;