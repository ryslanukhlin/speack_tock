import { FC, ReactNode, useState } from 'react';

type AlertProps = {
    children: ReactNode;
    type?: 'success' | 'error';
};

const Alert: FC<AlertProps> = ({ children, type = 'success' }) => {
    const [close, setClose] = useState(false);

    if (close) return null;

    return (
        <div
            className={`flex justify-between items-center w-full p-4 ${
                type === 'success' ? 'bg-green-100' : 'bg-pink-100'
            } text-sm mb-4`}>
            <div className="text">{children}</div>
            <div
                onClick={setClose.bind(null, true)}
                className="flex justify-center text-[30px] h-[26px] w-[26px]">
                &times;
            </div>
        </div>
    );
};

export default Alert;
