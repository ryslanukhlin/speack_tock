import { NextPage } from 'next';
import Nav from '../components/Nav';
import { userVar } from '../graphql/store/user';

const Home: NextPage = () => {
    return <div>{JSON.stringify(userVar())}</div>;
};

export default Home;
