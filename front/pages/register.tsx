import { useReactiveVar } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useRegisterUserMutation } from '../graphql/generated';
import { downloadUserVar } from '../graphql/store/downloadUser';
import { ValidError } from '../graphql/type/errorTypeValidate';
import useInput from '../hooks/useInput';

type ErrorKeys = {
    email?: undefined;
    name?: undefined;
    password?: undefined;
    phone?: undefined;
};

export const Register: NextPage = () => {
    const download = useReactiveVar(downloadUserVar);
    const [name, setName, resetName] = useInput();
    const [email, setEmail, resetEmail] = useInput();
    const [phone, setPhone, resetPhone] = useInput();
    const [password, setPassword, resetPassword] = useInput();

    const [registerMutate, { data, loading, error }] = useRegisterUserMutation({
        errorPolicy: 'all',
    });

    const register = async () => {
        const request = await registerMutate({ variables: { name, email, phone, password } });

        if (!request.errors) {
            resetName();
            resetEmail();
            resetPhone();
            resetPassword();
        }
    };

    let errors: ErrorKeys | undefined = undefined;
    if (error)
        errors = (
            error?.graphQLErrors[0].extensions as ValidError
        ).response.message.reduce<ErrorKeys>((errs, err) => {
            return { ...errs, [err.split(' ')[0]]: err };
        }, {});
    else errors = undefined;

    if (download) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            {loading && <Spinner />}
            <div className="authWrapper h-screen w-full">
                <div className="authContainer">
                    <h1 className="text-2xl font-semibold mb-6">Регистрация</h1>
                    {data && <Alert>Вы успешно зарегистрировались {data.registerUser.name}</Alert>}
                    <div className="mb-2">
                        <label className="label" htmlFor="name">
                            Имя
                        </label>
                        <input
                            value={name}
                            onChange={setName}
                            type="text"
                            className={`input ${errors?.name && 'error'}`}
                            id="name"
                        />
                        <p className="errorTxt">{errors?.name}</p>
                    </div>
                    <div className="mb-2">
                        <label className="label" htmlFor="email">
                            Почта
                        </label>
                        <input
                            value={email}
                            onChange={setEmail}
                            type="email"
                            className={`input ${errors?.email && 'error'}`}
                            id="email"
                        />
                        <p className="errorTxt">{errors?.email}</p>
                    </div>
                    <div className="mb-2">
                        <label className="label" htmlFor="phone">
                            Телефон
                        </label>
                        <input
                            value={phone}
                            onChange={setPhone}
                            type="text"
                            className={`input ${errors?.phone && 'error'}`}
                            id="phone"
                        />
                        <p className="errorTxt">{errors?.phone}</p>
                    </div>
                    <div className="mb-4">
                        <label className="label" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            value={password}
                            onChange={setPassword}
                            type="password"
                            className={`input ${errors?.password && 'error'}`}
                            id="password"
                        />
                        <p className="errorTxt">{errors?.password}</p>
                    </div>
                    <button onClick={register} disabled={loading} className="button px-6 py-2 mb-2">
                        Регистрация
                    </button>
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

export async function getStaticProps() {
    return {
        props: {
            public: true,
        },
    };
}

export default Register;
