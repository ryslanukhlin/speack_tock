import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userVar } from '../../graphql/store/user';
import Image from 'next/image';
import { AiOutlineSend } from 'react-icons/ai';
import { MdCall, MdVideocam } from 'react-icons/md';
import {
    GetMessagesQuery,
    useGetMessagesLazyQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useSendMessageWatcherSubscription,
} from '../../graphql/generated';
import useInput from '../../hooks/useInput';
import { Message } from '../../graphql/type/message';
import MessagesItem from '../../components/component/message';

const MessageRoom = () => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const room = user?.rooms.find((room) => room.id === router.query.id);

    useEffect(() => {
        if (!room) router.push('/message');
    }, []);

    const [messages, setMessages] = useState<Message[]>([]);
    const [loadMessages] = useGetMessagesLazyQuery({
        variables: { roomId: room?.id! },
    });

    const loadMessage = async () => {
        const { data } = await loadMessages();
        if (Array.isArray(data?.getMessages)) setMessages(data?.getMessages!);
    };

    useEffect(() => {
        loadMessage();
    }, []);

    const [chatInput, changeChatInput] = useInput('');
    const frend = room?.users.find((frend) => frend.id !== user?.id);
    const { data: newMessage } = useSendMessageWatcherSubscription({
        variables: { roomCode: String(router.query.id) },
    });

    useEffect(() => {
        if (newMessage?.sendMessageWatcher)
            setMessages([...messages, newMessage.sendMessageWatcher]);
    }, [newMessage]);

    const [sendMessageMutation] = useSendMessageMutation();
    const sendMessage = async () => {
        await sendMessageMutation({
            variables: { text: chatInput, roomCode: router.query.id as string },
        });
        window.scroll({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className="w-full h-full relative">
            <div className="h-[99px] border-b border-gray-200 bg-white flex items-center px-6 justify-between fixed widthChat">
                <div className="flex items-center">
                    <Image src="/user.png" width="60" height="60" className="rounded-full" />
                    <div className="ml-4">
                        <div className="font-medium text-[18px]">{frend?.name}</div>
                        <div className="text-gray-600 text-[16px]">{frend?.phone}</div>
                    </div>
                </div>
                <div className="flex">
                    <MdVideocam className="text-[40px] text-gray-600 mr-6" />
                    <MdCall className="text-[40px] text-gray-600" />
                </div>
            </div>
            <div className="mb-[98px] mt-[107px]">
                {messages?.map((message) => (
                    <MessagesItem key={message.id} message={message} />
                ))}
            </div>
            <div className="w-full bottom-0 flex p-6 bg-white fixed widthChat">
                <input
                    value={chatInput}
                    onChange={changeChatInput}
                    className="input ring-1 ring-gray-300 w-full rounded-r-none"
                    type="text"
                />
                <button
                    onClick={sendMessage}
                    className="button px-6 rounded-l-none ring-1 ring-indigo-500 flex items-center">
                    <AiOutlineSend className="mr-1 text-xl" />
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default MessageRoom;
