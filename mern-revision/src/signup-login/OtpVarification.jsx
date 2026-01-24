import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function OtpVerification() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("useremail");
        if (storedEmail) {
            setEmail(storedEmail);
            localStorage.removeItem("useremail"); // Removes only the email, not everything
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric input
        setOtp(value.slice(0, 6)); // Limit to 6 digits
    };

    const handleSubmit = async () => {
        if (otp.length !== 6) {
            setMessage("OTP must be 6 digits");
            return;
        }

        if (!email) {
            setMessage("Email not found. Please go back to the signup form.");
            toast.warning("Email not found");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/codesy/v1/optvarification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp, email }), // Send OTP & email
            });

            const data = await response.json();
            // console.log("bakend otp response ",data)

            if (response.ok) {
                setMessage("OTP verified successfully!");
                toast.success("OTP verified successfully")
                setTimeout( () =>{
                    navigate('/login')
                }, 1000);
                
                
            } else {
                setMessage(data.message || "OTP verification failed!");
                toast.error("OTP verification failed!");
            }
        } catch (error) {
            setMessage("Network error. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center mt-20 bg-blue-500/90 p-6 rounded-lg">
            <p className="text-white mb-2">Email: {email || "No email provided"}</p>
            <input
                type="text"
                value={otp}
                onChange={handleChange}
                maxLength="6"
                placeholder="Enter OTP"
                className="w-48 h-12 text-center text-xl font-bold border-2 border-blue-600 
                           focus:border-blue-400 focus:outline-none rounded-lg"
            />
            <button 
                onClick={handleSubmit}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${
                    otp.length === 6 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={otp.length !== 6 || loading}
            >
                {loading ? "Verifying..." : "Submit"}
            </button>
            {message && <p className="mt-2 text-white">{message}</p>}
            <ToastContainer />
        </div>
    );
}

export default OtpVerification;
