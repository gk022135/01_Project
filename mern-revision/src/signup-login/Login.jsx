import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";


function Login() {
    const [showpass, SetShowpass] = useState(false)
    const { loading, setLoading, SendDataSignLogin, } = useContext(AppContext);
    const navigate = useNavigate();

    const [NormaluserData, setNormalUserData] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setNormalUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        SetMatch(true);
    };

    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin('login', NormaluserData);
        console.log("login form send succes", response);

        //local storage mein save kr rha hu

        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response.success) {
            toast.error(response.message);
        }
        else if (response.success) {
            toast.success(response.message)
            if (response.role === 'Admin') {
                //rediredt to admin page 
                <NavLink to={'/admin-dashboard'} />
            }
            if (response.role === "normal-user") {

                setTimeout(() => {
                    navigate("/user-home");
                }, 1000);
            }
        }
    };
    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:3000/codesy/v1/auth/oauth/google";
    };

    return (
        <div className="flex justify-center w-full items-center min-h-screen  px-4">
            <div className="w-full max-w-lg bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-gray-700/50 rounded-2xl p-8">
                <form className="flex flex-col" onSubmit={submitHandler}>
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">
                        User Login
                    </h1>
                    <p className="text-gray-400 text-sm text-center mb-6">Welcome back! Please login to your account</p>

                    {/* Email Field */}
                    <label htmlFor="email" className="mt-4 text-sm font-medium text-gray-300">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={NormaluserData.email}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-3 mt-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition duration-200"
                    />

                    {/* Password Field */}
                    <label htmlFor="pass-login" className="mt-5 text-sm font-medium text-gray-300 flex justify-between items-center">
                        Password
                        <span
                            onClick={() => { SetShowpass(!showpass) }}
                            className="cursor-pointer text-gray-400 hover:text-white transition duration-200"
                        >
                            {showpass ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                        </span>
                    </label>
                    <input
                        type={showpass ? "text" : "password"}
                        id="pass-login"
                        name="password"
                        placeholder="Enter your password"
                        value={NormaluserData.password}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-3 mt-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition duration-200"
                    />

                    {/* Forgot Password Link */}
                    <div className="flex justify-end mt-2">
                        <NavLink
                            to="/forgot-password"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition duration-200"
                        >
                            Forgot Password?
                        </NavLink>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 hover:scale-[1.02]"
                        >
                            Login
                        </button>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2
             bg-gray-700/50 hover:bg-gray-600/50
             border border-gray-600 text-white
             py-3 rounded-lg cursor-pointer
             transition-all duration-200
             hover:scale-[1.02] hover:border-gray-500"
                        >
                            <FcGoogle size={24} />
                            <span className="font-medium">Continue with Google</span>
                        </button>

                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;