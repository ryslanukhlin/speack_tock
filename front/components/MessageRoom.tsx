import React, { FC } from 'react';
import { Room, userVar } from '../graphql/store/user';
import Image from 'next/image';
import { useRouter } from 'next/router';

type MessageRoomProps = {
    room: Room;
};

const MessageRoom: FC<MessageRoomProps> = ({ room }) => {
    const router = useRouter();
    const frend = room.users.find((user) => user.id !== userVar()?.id);

    const shipmentRoomChat = () => {
        router.push('/message/' + room.id);
    };

    return (
        <div
            onClick={shipmentRoomChat}
            className="bg-white px-10 py-6 flex items-center mb-3 hover:bg-gray-100 rounded-md">
            <Image src="/user.png" width="60" height="60" className="rounded-full" />
            <div className="ml-4">
                <div className="font-medium text-[20px]">{frend?.name}</div>
                <div className="text-gray-700 text-[16px]">{frend?.phone}</div>
            </div>
        </div>
    );
};

export default MessageRoom;
