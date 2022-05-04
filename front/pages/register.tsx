import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <div className="authWrapper h-screen w-full">
                <div className="authContainer">
                    <h1 className="text-2xl font-semibold mb-6">Регистрация</h1>
                    <div className="mb-3">
                        <label className="label" htmlFor="username">
                            Никнейм
                        </label>
                        <input type="text" className="input" id="username" />
                    </div>
                    <div className="mb-3">
                        <label className="label" htmlFor="email">
                            Почта
                        </label>
                        <input type="email" className="input" id="email" />
                    </div>
                    <div className="mb-3">
                        <label className="label" htmlFor="phone">
                            Телефон
                        </label>
                        <input type="text" className="input" id="phone" />
                    </div>
                    <div className="mb-6">
                        <label className="label" htmlFor="password">
                            Пароль
                        </label>
                        <input type="password" className="input" id="password" />
                    </div>
                    <button className="button px-6 py-2 mb-3">Регистрация</button>
                    <p>
                        Уже зарегестрированы? -&nbsp;
                        <Link href="/login">Войти!</Link>
                    </p>
                    <div
                        className="absolute bottom-0 left-0 w-full text-lg font-medium
                    h-[50px] bg-gray-200 flex justify-center items-center disabled-small-height">
                        SpeackTock
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
