import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { userVar } from '../graphql/store/user';
import Image from 'next/image';

const Contacts = () => {
    const user = useReactiveVar(userVar);

    return (
        <div className="grid grid-cols-3 gap-4 w-full p-4">
            {user?.frends.map((frend) => (
                <div
                    key={frend.id}
                    className="bg-white col-span-3 rounded-md lg:col-span-2 xl:col-span-1">
                    <div className="flex">
                        <Image src="/user.png" width="139" height="139%" />
                        <div className="p-3">
                            <div className="text-[20px] font-medium">{frend.phone}</div>
                            <div className="text-[16px] text-gray-600">{frend.name}</div>
                            <div className="text-[14px] text-gray-600">{frend.email}</div>
                            <button className="button py-2 px-3 mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800">
                                Удалить контакт
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Contacts;
