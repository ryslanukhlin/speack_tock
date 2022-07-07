import { NextPage } from 'next';
import {
    useAddFrendMutation,
    useGetUsersQuery,
    useRequestFrendshipMutation,
} from '../graphql/generated';
import Image from 'next/image';
import { userVar } from '../graphql/store/user';
import { useReactiveVar } from '@apollo/client';

const SearchContact: NextPage = () => {
    const authUser = useReactiveVar(userVar);
    const { data, loading } = useGetUsersQuery({
        variables: { id: userVar()?.id! },
    });
    const [requestFrendMutatuin] = useRequestFrendshipMutation();
    const [addFrendMutation] = useAddFrendMutation();

    const requestFrend = async (frendId: string) => {
        const request = await requestFrendMutatuin({
            variables: { id: authUser!.id, frendId },
        });

        userVar(request.data!.requestFrendship);
    };

    const addFrend = async (frendId: string) => {
        const requsest = await addFrendMutation({
            variables: { id: authUser!.id, frendId },
        });

        userVar(requsest.data!.addFrend);
    };

    if (loading) return null;

    return (
        <div className="p-4 grid grid-cols-8 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
            {data?.getUsers.map((user, index) => (
                <div
                    key={user.name + index}
                    className="mb-4 col-span-8 sm:col-span-4 lg:col-span-1 p-4 bg-white rounded mr-2 last:mr-0 flex flex-col items-center">
                    <Image src="/user.webp" width={50} height={50} />
                    <div className="mt-3">{user.name}</div>
                    {authUser?.frends.find((frend) => frend.id === user.id) ? (
                        <button
                            className="button w-full p-2 mt-3 disabled:bg-gray-200 disabled:text-black"
                            disabled>
                            Вы в друзьях
                        </button>
                    ) : authUser?.outgoingRequestFrendship.find(
                          (outFrend) => outFrend.id === user.id,
                      ) ? (
                        <button
                            className="button w-full p-2 mt-3 disabled:bg-gray-200 disabled:text-black"
                            disabled>
                            Заявка отправлена
                        </button>
                    ) : authUser?.incomingRequestFrendship.find(
                          (incFrend) => incFrend.id === user.id,
                      ) ? (
                        <button
                            onClick={addFrend.bind(null, user.id)}
                            className="button w-full p-2 mt-3 bg-green-600 hover:bg-green-700 active:bg-green-800">
                            Принять в друзья
                        </button>
                    ) : (
                        <button
                            className="button w-full p-2 mt-3"
                            onClick={requestFrend.bind(null, user.id)}>
                            Добавить в друзья
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SearchContact;
