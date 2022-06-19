import { Link } from 'react-router-dom';

const Propose = () => {
    return (<>
        <h1 className="mb-10">Create Proposal</h1>
        <div className="flex flex-col space-y-14 font-bold text-center">
            <Link to="/propose/lunch">
                <div className="card py-4">
                    plan a lunch
                </div></Link>
            <Link to="/propose/cater">
                <div className="card py-4">
                    change cater list
                </div>
            </Link>
        </div>
    </>)
};

export default Propose;