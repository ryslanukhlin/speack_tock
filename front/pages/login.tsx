import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Авторизация</title>
            </Head>
            <div className="authWrapper h-screen w-full">
                <div className="authContainer">
                    <h1 className="text-2xl font-semibold mb-6">Авторизация</h1>
                    <div className="mb-3">
                        <label className="label" htmlFor="phone">
                            Телефон
                        </label>
                        <input type="text" className="input" id="phone" />
                    </div>
                    <div className="mb-3">
                        <label className="label" htmlFor="password">
                            Пароль
                        </label>
                        <input type="password" className="input" id="password" />
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="checkRememberMe"
                            className="input-check text-xs"
                        />
                        <label htmlFor="checkRememberMe">Запомнить меня</label>
                    </div>
                    <button className="button px-6 py-2 mb-3">Войти</button>
                    <p>
                        Ещё не зарегестрированы? -&nbsp;
                        <Link href="/register">Зарегистрироваться!</Link>
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

export default Login;
