import { FC, ReactNode } from 'react';
import Nav from '../Nav';

type UserLayoutProps = {
    children: ReactNode;
};

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <Nav />
            <div className="flex flex-wrap  content-start bg-gray-300 w-full ml-[300px] min-h-[100vh]">
                {children}
            </div>
        </div>
    );
};

export default UserLayout;
