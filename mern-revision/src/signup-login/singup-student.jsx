import { useContext, useMemo, useState } from "react";
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

// import Loader from "../UiComponents/Loader";

function SignupStudent() {
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isPassMatch, setMatch] = useState(true);
    const { loading, SendDataSignLogin } = useContext(AppContext);

    const [formData, setFormData] = useState({
        username: "", email: "", password: "", confirmpass: "", role: "normal-user",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setMatch(true);
    };

    const signUpPayload = useMemo(() => ({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
    }), [formData]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpass) {
            setMatch(false);
            toast.warning("Passwords do not match");
            return;
        }

        const response = await SendDataSignLogin("signup", signUpPayload);

        if (response.error) toast.error(response.error);
        else if (response.success) {
            toast.success(response.message);
            setTimeout(() => navigate("/otpvarification"), 1000);
        } else if (response.message === "User already exists, please login") {
            toast.warn(response.message);
            setTimeout(() => navigate("/login"), 1000);
        }
    };

    return (
        <>
            <AuthLayout
            hero={
                <FeaturePanel
                    title="Welcome to the Future"
                    description="Create your student account and start learning with a faster, smarter, and more connected campus experience."
                    features={["Secure sign-in", "Fast onboarding", "Real-time updates"]}
                    badge="Trusted by active students"
                    icon={
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                        </svg>
                    }
                />
            }
        >
            <AuthCard
                loading={loading}
                title="Student Registration"
                subtitle="Join thousands of learners and access your personalized academic workspace."
            >
                <form onSubmit={submitHandler} className="space-y-4">
                    <Field label="Full Name" htmlFor="username">
                        <InputField
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={changeHandler}
                            placeholder="Enter your full name"
                        />
                    </Field>

                    <Field label="Email Address" htmlFor="email">
                        <InputField
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            placeholder="Enter your email address"
                        />
                    </Field>

                    <Field label="Password" htmlFor="password">
                        <PasswordField
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Create a strong password"
                            isVisible={showPass}
                            onToggle={() => setShowPass((prev) => !prev)}
                        />
                    </Field>

                    <Field label="Confirm Password" htmlFor="confirmpass">
                        <PasswordField
                            id="confirmpass"
                            name="confirmpass"
                            value={formData.confirmpass}
                            onChange={changeHandler}
                            placeholder="Confirm your password"
                            isVisible={showConfirmPass}
                            onToggle={() => setShowConfirmPass((prev) => !prev)}
                            invalid={!isPassMatch}
                        />
                    </Field>

                    <PrimaryButton type="submit">Create Account</PrimaryButton>
                </form>

                <div className="mt-6 text-center text-sm text-base-content/70">
                    Already have an account?{" "}
                    <NavLink to="/login" className="font-semibold text-primary hover:text-secondary">
                        Sign In
                    </NavLink>
                </div>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-base-content/20" />
                    <span className="text-xs uppercase tracking-wide text-base-content/50">or continue with</span>
                    <div className="h-px flex-1 bg-base-content/20" />
                </div>

                <button
                    type="button"
                    className="btn btn-outline h-12 w-full border-base-content/20 bg-base-200/60 text-white hover:bg-base-200"
                >
                    <FcGoogle size={22} />
                    <LoginButton />
                </button>
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
                toastClassName="backdrop-blur-md bg-white/10 border border-white/20"
            />
        </>
    );
}

export default SignupStudent;