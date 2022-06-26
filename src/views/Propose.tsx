import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const Propose = () => {
    return (<Wrapper>
        <h1 className="mb-10">Create Proposal</h1>
        <div className="flex flex-col space-y-2">
            <div>There are currently two topics. We need to pick which cater we want first.</div>
            <Link to="/propose/cater">
                <div className="card py-4 font-bold text-center">
                    change cater list
                </div>
            </Link>
            <div className="pt-12">This will make a poll to pick menus within the selected cater.</div>
            <Link to="/propose/lunch">
                <div className="card py-4 font-bold text-center">
                    plan a lunch
                </div>
            </Link>
        </div>
    </Wrapper>)
};

export default Propose;