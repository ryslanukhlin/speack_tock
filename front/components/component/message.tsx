import { useReactiveVar } from '@apollo/client';
import { FC } from 'react';
import { userVar } from '../../graphql/store/user';
import { Message } from '../../graphql/type/message';

type MessageProps = {
    message: Message;
};

const Message: FC<MessageProps> = ({ message }) => {
    const user = useReactiveVar(userVar);
    const isFrendMessage = message.user.id === user?.id;
    return isFrendMessage ? (
        <div className="flex ml-4 mt-2">
            <div className="bg-white p-4 rounded-2xl w-fit break-all text-center max-w-[80%]">
                {message.text}
            </div>
        </div>
    ) : (
        <div className="flex justify-end mr-4 mt-2">
            <div className="bg-indigo-400 p-4 rounded-2xl w-fit break-all text-center max-w-[80%]">
                {message.text}
            </div>
        </div>
    );
};

export default Message;
