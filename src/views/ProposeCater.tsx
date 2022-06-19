
const ProposeCater = () => {
    return (<>
        <h1>Change Cater List</h1>
        <p>This will create a poll to change the short list of caters. Every Lunch will be picked among this approved list.</p>
        <div className="flex flex-col space-y-4 mt-5">
            <p className="font-bold text-lg">people can vote until:</p>
            <div className="flex flex-col">
                <p className="mb-2">date:</p>
                <input type="date" />
            </div>
            <div className="flex flex-col">
                <p className="mb-2">time:</p>
                <input type="time" />
            </div>
            <div className="flex flex-row justify-end">
                <div className="card flex-none font-bold px-5">submit</div>
            </div>
        </div>
    </>
    )
}

export default ProposeCater;