import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "../Google Auth/Login";
import {
    AuthCard,
    AuthLayout,
    FeaturePanel,
    Field,
    InputField,
    PasswordField,
    PrimaryButton,
} from "./AuthShared";


function Login() {
    const [showPass, setShowPass] = useState(false);
    const { loading, SendDataSignLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handling form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin("login", loginData);

        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response?.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);

        if (response.role === "Admin" || response.role === "Admin-user") {
            setTimeout(() => navigate("/admin-dashboard"), 700);
            return;
        }

        if (response.role === "normal-user") {
            setTimeout(() => navigate("/user-home"), 700);
            return;
        }

        setTimeout(() => navigate("/user-home"), 700);
    };

    return (
        <>
            <AuthLayout
                hero={
                    <FeaturePanel
                        title="Welcome Back"
                        description="Sign in to continue your personalized experience with classes, updates, and your campus workspace."
                        features={["Secure authentication", "Fast access", "Seamless dashboard"]}
                        badge="Premium sign-in experience"
                        icon={
                            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                            </svg>
                        }
                    />
                }
            >
                <AuthCard
                    loading={loading}
                    title="Sign In"
                    subtitle="Enter your credentials to access your account."
                >
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <Field label="Email Address" htmlFor="email">
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={changeHandler}
                                placeholder="Enter your email"
                            />
                        </Field>

                        <Field label="Password" htmlFor="pass-login">
                            <PasswordField
                                id="pass-login"
                                name="password"
                                value={loginData.password}
                                onChange={changeHandler}
                                placeholder="Enter your password"
                                isVisible={showPass}
                                onToggle={() => setShowPass((prev) => !prev)}
                            />
                        </Field>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-base-content/60">Secure login enabled</span>
                            <NavLink to="/admin-login" className="font-medium text-secondary hover:text-primary">
                                Teacher login
                            </NavLink>
                        </div>

                        <PrimaryButton type="submit">Login</PrimaryButton>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-base-content/20" />
                        <span className="text-xs uppercase tracking-wide text-base-content/50">or continue with</span>
                        <div className="h-px flex-1 bg-base-content/20" />
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-xl border border-base-content/20 bg-base-200/60 px-4 py-3 text-white transition hover:bg-base-200">
                        <FcGoogle size={22} />
                        <LoginButton />
                    </div>

                    <p className="mt-6 text-center text-sm text-base-content/70">
                        New here?{" "}
                        <NavLink to="/signup" className="font-semibold text-primary hover:text-secondary">
                            Create an account
                        </NavLink>
                    </p>
                </AuthCard>
            </AuthLayout>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>

    );
}

export default Login;