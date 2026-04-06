import { useContext, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import {
    AuthCard,
    AuthLayout,
    FeaturePanel,
    Field,
    InputField,
    PasswordField,
    PrimaryButton,
} from "./AuthShared";


function AdminLogin() {
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


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await SendDataSignLogin("admin-login", loginData);


        localStorage.setItem("UserData", JSON.stringify(response));

        if (!response?.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        setTimeout(() => {
            navigate("/admin-dashboard");
        }, 700);
    };

    return (
        <>
            <AuthLayout
                hero={
                    <FeaturePanel
                        title="Admin Access"
                        description="Login to the admin panel and manage courses, faculty operations, and institutional workflows."
                        features={["Secure role access", "Fast dashboard load", "Centralized control"]}
                        badge="Authorized personnel only"
                        icon={
                            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9H21ZM21 10H9V16H10V19H14V16H15V19H19V16H20V10H21ZM8 11V13H6V11H8ZM8 14V16H6V14H8ZM8 17V19H6V17H8Z" />
                            </svg>
                        }
                    />
                }
            >
                <AuthCard
                    loading={loading}
                    title="Teacher / Admin Login"
                    subtitle="Use your admin credentials to continue."
                >
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <Field label="Teacher Email" htmlFor="email">
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={changeHandler}
                                placeholder="Enter teacher email"
                            />
                        </Field>

                        <Field label="Password" htmlFor="pass-login">
                            <PasswordField
                                id="pass-login"
                                name="password"
                                value={loginData.password}
                                onChange={changeHandler}
                                placeholder="Enter password"
                                isVisible={showPass}
                                onToggle={() => setShowPass((prev) => !prev)}
                            />
                        </Field>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-base-content/60">Protected admin endpoint</span>
                            <NavLink to="/login" className="font-medium text-secondary hover:text-primary">
                                Student login
                            </NavLink>
                        </div>

                        <PrimaryButton type="submit">Login to Dashboard</PrimaryButton>
                    </form>
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

export default AdminLogin;