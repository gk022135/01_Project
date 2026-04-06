import { useContext, useMemo, useState } from "react";
import { AppContext } from "../ContextApi/FisrtContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    AuthCard,
    AuthLayout,
    FeaturePanel,
    Field,
    InputField,
    PasswordField,
    PrimaryButton,
    SelectField,
} from "./AuthShared";


function SignupTeacher() {
    const { loading, SendDataSignLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isPassMatch, setMatch] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpass: "",
        role: "Admin-user",
        FuckltyOf: "",
    });


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setMatch(true);
    };

    const payload = useMemo(() => ({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        FuckltyOf: formData.FuckltyOf,
    }), [formData]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpass) {
            setMatch(false);
            toast.warning("Passwords do not match");
            return;
        }

        localStorage.setItem("useremail", formData.email);
        const response = await SendDataSignLogin("admin-sign-up", payload);

        if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
                navigate("/admin-login");
            }, 1000);
        }
        if (!response.success) toast.error(response.message);
    };

    const facultyOptions = [
        { value: "CSE", label: "Computer Science & Engineering" },
        { value: "ECE", label: "Electronic Communication & Engineering" },
        { value: "EE", label: "Electrical Engineering" },
        { value: "CE", label: "Civil Engineering" },
        { value: "MEC", label: "Mechanical Engineering" },
        { value: "BIOTECH", label: "Biotechnology and Engineering" },
        { value: "BBA", label: "Bachelors of Business Administration" },
        { value: "MBA", label: "Masters in Business Administration" },
    ];



    return (
        <>
            <AuthLayout
                hero={
                    <FeaturePanel
                        title="Admin Dashboard"
                        description="Create your administrator account to manage faculty, courses, and student operations with confidence."
                        features={["Faculty management", "Course operations", "Student records"]}
                        badge="Admin portal active"
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
                    title="Teacher / Admin Registration"
                    subtitle="Create your admin account with a premium onboarding experience."
                >
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <Field label="Teacher Name" htmlFor="username">
                            <InputField
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={changeHandler}
                                placeholder="Enter teacher's full name"
                            />
                        </Field>

                        <Field label="Teacher Email" htmlFor="email">
                            <InputField
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                placeholder="Enter teacher's email address"
                            />
                        </Field>

                        <Field label="Faculty Of" htmlFor="FuckltyOf">
                            <SelectField
                                id="FuckltyOf"
                                name="FuckltyOf"
                                value={formData.FuckltyOf}
                                onChange={changeHandler}
                                options={facultyOptions}
                                placeholder="Select an option"
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

                        <PrimaryButton type="submit">Create Admin Account</PrimaryButton>
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
                toastClassName="backdrop-blur-md bg-white/10 border border-white/20"
            />
        </>
    );
}

export default SignupTeacher;