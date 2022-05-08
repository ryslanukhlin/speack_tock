import { NextPage } from 'next';
import { userVar } from '../graphql/store/user';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { MdMessage, MdManageSearch } from 'react-icons/md';
import { AiFillContacts, AiFillSetting } from 'react-icons/ai';

const Home: NextPage = () => {
    return (
        <div className="flex">
            <div className="h-screen w-[300px] border-r-[1px] border-gray-200">
                <div className="flex px-4 py-6">
                    <Image src="/userIcon.gif" width={50} height={50} />
                    <div className="ml-4">
                        <div>{userVar()?.name}</div>
                        <div>{userVar()?.phone}</div>
                    </div>
                </div>
                <div className="line" />
                <div className="mt-6">
                    <ul className="hover:bg-gray-100 py-4 px-4 flex items-center cursor-pointer">
                        <FaUserAlt className="text-[30px] text-indigo-300 mr-4" />
                        Профиль
                    </ul>
                    <ul className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <MdMessage className="text-[30px] text-indigo-300 mr-4" />
                        Сообшения
                    </ul>
                    <ul className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <AiFillContacts className="text-[30px] text-indigo-300 mr-4" />
                        Контакты
                    </ul>
                    <ul className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <MdManageSearch className="text-[30px] text-indigo-300 mr-4" />
                        Поиск Контактов
                    </ul>
                    <ul className="hover:bg-gray-100 py-4 px-4  flex items-center cursor-pointer">
                        <AiFillSetting className="text-[30px] text-indigo-300 mr-4" />
                        Настройки
                    </ul>
                </div>
            </div>
            <div>{JSON.stringify(userVar())}</div>
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    };
}

export default Home;
