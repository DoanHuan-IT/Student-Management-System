import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {FaEye, FaEyeSlash, FaChevronDown} from 'react-icons/fa';
import logo from '~/assets/images/logos/EduNexus-LMS.png';
import rightPanel from '~/assets/images/panels/panel.png';


const LoginForm = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const {t, i18n} = useTranslation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangOpen(false);
    }

    const onFormSubmit = (data) => {
        onSubmit(data.username, data.password);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#EAE0C8] p-4 ">
            {/* Form */}
            <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
                {/* Left Side */}
                <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12">
                    {/* Logo and Language */}
                    <div className="flex items-center justify-between">
                        <img src={logo} alt="Logo" className="h-24 w-auto" />
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#063138] focus:outline-none transition-colors"
                            >
                                <span className="uppercase font-bold">{i18n.language}</span>
                                <FaChevronDown
                                    size={12}
                                    className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-20 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in-down">
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                            i18n.language === 'en' ? 'font-bold text-[#063138] bg-gray-50' : 'text-slate-600'
                                        }`}
                                    >
                                        EN
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('vi')}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                            i18n.language === 'vi' ? 'font-bold text-[#063138] bg-gray-50' : 'text-slate-600'
                                        }`}
                                    >
                                        VI
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mx-auto w-full max-w-sm py-10">
                        <h1 className="mb-2 text-3xl font-bold text-[#063138]">{t('welcome')}</h1>
                        <p className="mb-8 text-sm text-slate-500">{t('login_subtitle')}</p>
                    
                        <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
                            {/* Input */}
                            <div className="space-y-0.5">
                                <label htmlFor="username" className="text-sm font-medium text-[#063138]">{t('username')}</label>
                                <input
                                    id="username"
                                    type="text"
                                    {...register('username', {
                                        required: t('username_required')
                                    })}
                                    className={`w-full rounded-xl border bg-slate-50 p-3 text-sm outline-none focus:border-[#063138] ${
                                        errors.username ? "border-red-500" : "border-slate-200"
                                    }`}
                                    placeholder="Enter your username"
                                />
                                <div className="min-h-5">
                                    {errors.username && (
                                        <span className="text-xs text-red-500 flex items-center gap-1">
                                            {errors.username.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label htmlFor="password" className="text-sm font-medium text-[#063138]">{t('password')}</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', {
                                            required: t('password_required')
                                        })}
                                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-[#063138] ${
                                            errors.password ? "border-red-500" : "border-slate-200"
                                        }`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                        onClick={togglePasswordVisibility}
                                        data-testid="toggle-password"
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <div className="min-h-5">
                                    {errors.password && (
                                        <span className="text-xs text-red-500 flex items-center gap-1">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button className="w-full rounded-full bg-[#0B4851] py-2 font-bold text-white text-lg hover:bg-[#063138] transition-all">
                                {t('login_button')}
                            </button>
                        </form>

                        <div className="flex flex-row mt-4 text-sm font-medium text-[#063138]">
                            <p>{t('check_account')} </p><Link to="/register" className="ml-1.5  text-blue-500 hover:underline">{t('register_here')}</Link>
                        </div>

                    </div>

                    <p className="text-center text-[10px] uppercase tracking-widest text-slate-500">
                        © 2026 EduNexus LMS
                    </p>
                </div>

                {/* Right Side*/}
                <div className="hidden w-1/2 md:block">
                    <div className="relative h-full w-full bg-green-100">
                        <img 
                            src={rightPanel}
                            alt="EduNexusLMS" 
                            className="h-full w-full object-cover"
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center p-10 bg-black/10">
                            <div className="rounded-2xl bg-white/5 p-8 shadow-xl backdrop-blur-md border border-white/30 text-white">
                                <h2 className="mb-2 text-xl font-bold text-center">EduNexus LMS</h2>
                                <p className="text-sm opacity-90">Your Gateway to Academic Excellence.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default LoginForm;