import React from 'react';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { MdMessage, MdManageSearch } from 'react-icons/md';
import { AiFillContacts, AiFillSetting } from 'react-icons/ai';
import { userVar } from '../graphql/store/user';
import Link from 'next/link';

const Nav = () => {
    return (
        <div className="fixed w-[300px] bg-white border-r-[1px] border-gray-200 h-screen">
            <div className="flex px-4 py-6">
                <Image src="/user.png" width={50} height={50} />
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
                <Link href={'/message'}>
                    <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <MdMessage className="text-[30px] text-indigo-300 mr-4" />
                        Сообшения
                    </li>
                </Link>
                <Link href="/contacts">
                    <li className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <AiFillContacts className="text-[30px] text-indigo-300 mr-4" />
                        Контакты
                    </li>
                </Link>
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
    );
};

export default Nav;
