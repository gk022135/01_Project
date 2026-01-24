// pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // backend already set cookie
        // optionally call /me to get user

        navigate("/user-home");
    }, []);

    return <p>Signing you in...</p>;
}

export default OAuthSuccess;
