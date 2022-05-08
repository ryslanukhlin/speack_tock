import { NextPage } from 'next';
import { userVar } from '../graphql/store/user';

const Home: NextPage = () => {
    return <>{JSON.stringify(userVar())}</>;
};

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    };
}

export default Home;
