import { FC, ReactNode, useEffect } from 'react';
import {
    useAddFrendSubscribeSubscription,
    useIncomingRequestFrendshipSubscription,
} from '../../graphql/generated';
import { userVar } from '../../graphql/store/user';
import Nav from '../Nav';

type UserLayoutProps = {
    children: ReactNode;
};

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
    const { data: dataAddInc, loading: loadingAddInc } = useIncomingRequestFrendshipSubscription({
        variables: { roomCode: userVar()?.id! },
    });

    useEffect(() => {
        if (dataAddInc && !loadingAddInc) {
            userVar(dataAddInc.incomingRequestFrendship);
        }
    }, [dataAddInc, loadingAddInc]);

    const { data: dataAddFrend, loading: loadingAddFrend } = useAddFrendSubscribeSubscription({
        variables: { roomCode: userVar()?.id! },
    });

    useEffect(() => {
        if (dataAddFrend && !loadingAddFrend) {
            userVar(dataAddFrend.addFrendSubscribe);
        }
    }, [dataAddFrend, loadingAddFrend]);

    return (
        <div className="flex">
            <Nav />
            {children}
        </div>
    );
};

export default UserLayout;
