import { useEffect } from 'react';
import {
    useIncomingRequestFrendshipSubscription,
    useAddFrendSubscribeSubscription,
} from '../graphql/generated';
import { userVar } from '../graphql/store/user';

const useSubscribeDate = () => {
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
};

export default useSubscribeDate;
