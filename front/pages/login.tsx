import { useReactiveVar } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useLoginUserMutation } from '../graphql/generated';
import { tokenVar } from '../graphql/store/token';
import { downloadUserVar } from '../graphql/store/downloadUser';
import useInput from '../hooks/useInput';

export const Login: NextPage = () => {
    const download = useReactiveVar(downloadUserVar);
    const [phone, setPhone] = useInput();
    const [password, setPassword] = useInput();
    const [remember, setRemember] = useState(false);

    const [loginMutate, { data, loading, error }] = useLoginUserMutation({
        errorPolicy: 'all',
    });

    const login = async () => {
        const request = await loginMutate({
            variables: { phone, password },
        });
        tokenVar(request.data?.loginUser.access_token);
        if (remember) {
            localStorage.setItem('auth_token', request.data?.loginUser.access_token!);
        }
    };

    if (download) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Авторизация</title>
            </Head>
            {loading && <Spinner />}
            <div className="authWrapper h-screen w-full">
                <div className="authContainer">
                    <h1 className="text-2xl font-semibold mb-6">Авторизация</h1>
                    {error && <Alert type="error">Неправильный номер или пароль</Alert>}
                    <div className="mb-3">
                        <label className="label" htmlFor="phone">
                            Телефон
                        </label>
                        <input
                            value={phone}
                            onChange={setPhone}
                            type="text"
                            className="input"
                            id="phone"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="label" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            value={password}
                            onChange={setPassword}
                            type="password"
                            className="input"
                            id="password"
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="checkRememberMe"
                            className="input-check text-xs"
                            checked={remember}
                            onChange={setRemember.bind(null, (prev) => !prev)}
                        />
                        <label htmlFor="checkRememberMe">Запомнить меня</label>
                    </div>
                    <button onClick={login} disabled={loading} className="button px-6 py-2 mb-3">
                        Войти
                    </button>
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
