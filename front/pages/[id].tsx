import { NextPage } from 'next';
import Nav from '../components/Nav';
import { userVar } from '../graphql/store/user';

const Home: NextPage = () => {
    const logout = () => {
        userVar(undefined);
        localStorage.removeItem('auth_token');
    };

    return (
        <div>
            <div>{JSON.stringify(userVar())}</div>
            <button onClick={logout} className="button p-4 mt-2">
                Выход
            </button>
        </div>
    );
};

export default Home;
