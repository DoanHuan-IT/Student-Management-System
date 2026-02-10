import React, {useContext} from 'react';
import {AppContext} from '~/context/AppContext';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ title = "DASHBOARD" }) => {
    const {user, handleLogout} = useContext(AppContext);
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
            <Sidebar user={user} handleLogout={handleLogout} />
            <div className="flex-1 ml-64 flex flex-col">
                <Header title={title} user={user} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};
export default MainLayout;