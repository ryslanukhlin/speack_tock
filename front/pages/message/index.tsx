import MessageRoom from '../../components/MessageRoom';
import { userVar } from '../../graphql/store/user';

const Messages = () => {
    return (
        <div className="flex w-full flex-col p-6">
            {userVar()?.rooms.map((room) => (
                <MessageRoom key={room.id} room={room} />
            ))}
        </div>
    );
};

export default Messages;
