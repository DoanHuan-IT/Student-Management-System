import {useEffect, useState} from "react";
import { AppContext } from "./AppContext"
import {logoutAPI} from '~/services/authJWT';
import i18next from "i18next";


export const AppProvider = ({children}) => {
    const [lang, setLang] = useState('en');
    const [user, setUser] = useState(() => {
        const saveUser = localStorage.getItem('user');
        const saveToken = localStorage.getItem('accessToken');
        return (saveUser && saveToken) ? JSON.parse(saveUser) : null;
    });

    const languages = [
        {id: 'en', name: 'English'},
        {id: 'vi', name: 'Vietnamese'},
    ]

    useEffect(() => {
        i18next.changeLanguage(lang);
    }, [lang])

    // const themeStyle = {
    //     light: {
    //         backgroundColor: 'white',
    //         color: 'black',
    //     },
    //     dark: {
    //         backgroundColor: 'black',
    //         color: 'white'
    //     }
    // }

    const handleLogin = (userData) => {
        setUser(userData);
    }

    const handleLogout = () => {
        logoutAPI();
        setUser(null);
    }

    const contextValue = {
        user,
        handleLogin,
        handleLogout,
        lang,
        setLang,
        languages: languages,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}