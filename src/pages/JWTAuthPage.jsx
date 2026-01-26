import LoginForm from "../components/Login/LoginForm";
import {loginAPI} from "../services/authJWT";

const AuthPage = ({onLoginSuccess}) => {
    const handleLogin = async (username, password) => {
        try {
            const result = await loginAPI(username, password);
            onLoginSuccess(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm">
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    )
}
export default AuthPage;