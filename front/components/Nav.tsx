import React from 'react';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { MdMessage, MdManageSearch } from 'react-icons/md';
import { AiFillContacts, AiFillSetting } from 'react-icons/ai';
import { userVar } from '../graphql/store/user';
import Link from 'next/link';
import { useSubscription } from '@apollo/client';
import { IncomingRequestFrendshipDocument } from '../graphql/generated';

const Nav = () => {
    return (
        <div>
            <div className="h-screen w-[300px] border-r-[1px] border-gray-200">
                <div className="flex px-4 py-6">
                    <Image src="/user.webp" width={50} height={50} />
                    <div className="ml-4">
                        <div>{userVar()?.name}</div>
                        <div>{userVar()?.phone}</div>
                    </div>
                </div>
                <div className="line" />
                <ul className="mt-6">
                    <Link href={'/' + userVar()?.id}>
                        <li className="hover:bg-gray-100 py-4 px-4 flex items-center cursor-pointer">
                            <FaUserAlt className="text-[30px] text-indigo-300 mr-4" />
                            Профиль
                        </li>
                    </Link>
                    <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <MdMessage className="text-[30px] text-indigo-300 mr-4" />
                        Сообшения
                    </li>
                    <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <AiFillContacts className="text-[30px] text-indigo-300 mr-4" />
                        Контакты
                    </li>
                    <Link href="/searchContact">
                        <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                            <MdManageSearch className="text-[30px] text-indigo-300 mr-4" />
                            Поиск Контактов
                        </li>
                    </Link>
                    <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <AiFillSetting className="text-[30px] text-indigo-300 mr-4" />
                        Настройки
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
