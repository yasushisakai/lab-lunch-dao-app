import data from '../dummy_data/list_view.json';
import TopicListItem from '../components/TopicListItem';

const List = () => {

    const myKey = 'key-a';
    const topics = data.topics;
    console.log(topics);

    const list = () =>
        topics.map(element => {
            return (<TopicListItem key={element.id} element={element} walletAddress={myKey}/>)
        });

    return (<>
        <h1>Topic List</h1>
        <div className="flex flex-row space-x-2 px-1 py-2 text-sm">
            <p>voted?</p>
            <p className='flex-1'>topic</p>
            <p>time left</p>
        </div>
        <div className="flex flex-col space-y-4">
        {list()}
        </div>
    </>)
};

export default List;