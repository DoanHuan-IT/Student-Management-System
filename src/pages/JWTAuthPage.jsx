import LoginForm from "~/components/AuthForm/Login/LoginForm";
import {loginAPI} from "~/services/authJWT";
import toast from 'react-hot-toast';

const AuthPage = ({onLoginSuccess}) => {
    const handleLogin = async (username, password) => {
        const loginPromise = loginAPI(username, password);

        toast.promise(loginPromise, {
            loading: 'Logging in...',
            success: (result) => {
                onLoginSuccess(result);
                return `Hello, ${result.username}`;
            },
            error: (error) => {
                return error.response?.data?.message || error.message || 'Login failed!';
            }
        })
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#EFEEF3]">
            <div className="w-full">
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    )
}
export default AuthPage;