import {useState} from "react";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const LoginForm = ({onSubmit}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h1 className="font-semibold tracking-tight text-2xl textcenter">
                        Login
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your username and password to login
                    </p>
                </div>

                <div  className="p-6 pt-0">
                    <form onSubmit={handleSubmit}>
                        <div  className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor='username' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                Username
                                </label>
                                <input
                                id='username'
                                type='text'
                                required
                                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                value={username}
                                onChange={(e) => setUsername(e.target.value) }
                                />
                            </div>

                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <label htmlFor='password' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value) }
                                    />
                                    {/* Thay thẻ span bằng button */}
                                    <button
                                        type="button" // Quan trọng: Để không bị hiểu nhầm là nút submit
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-900 focus:outline-none"
                                        onClick={togglePasswordVisibility}
                                        data-testid="toggle-password" // Thêm cái này để dễ select trong file test
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <button
                                    type='submit'
                                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-gray-800 h-9 px-4 py-2'
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginForm;