import { useState } from "react";

const BASE_URL = "http://localhost:3000/codesy/v1";

function AddEntryExitQr() { //  Don't use async here! may cause infinite render
    const [qrData, setQrData] = useState({
        Entry_Qr: "",
        Exit_Qr: ""
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setQrData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function onSubmit() {
        console.log("Your QR Data:", qrData);

        const userData = localStorage.getItem("UserData");
        const AdminEmail = userData ? JSON.parse(userData).email : "null";

        const updatedData = {
            Entry_Qr: qrData.Entry_Qr,
            Exit_Qr: qrData.Exit_Qr,
            AdminEmail: AdminEmail
        };

        console.log("Admin Email:", AdminEmail);

        try {
            const response = await fetch(`${BASE_URL}/put/addordetails`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();
            if (data.success) {
                console.log("QR Data updated:", data);
            } else {
                console.error("Failed to update QR data:", data.message);
            }
        } catch (error) {
            console.error("Error in updating QR data:", error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(); // ✅ Calls async function correctly
    }

    return (
        <div className="flex flex-col gap-2 border-2 text-white p-4 justify-center content-center items-center">
            <h1 className="bg-gradient-to-tr from-yellow-400 to-pink-600 bg-clip-text text-transparent text-2xl font-bold border-b-2 border-amber-300">
                Add Qr For Entry And Exit
            </h1>




            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <label htmlFor="entry" className="flex font-bold items-center">Entry QR</label>
                <input id="entry" placeholder="Entry QR"
                    name="Entry_Qr"
                    value={qrData.Entry_Qr}
                    onChange={changeHandler}
                    className="bg-base-100 50 p-2"
                />

                <label htmlFor="exit"
                    className="flex font-bold items-center"
                >Exit QR</label>
                <input id="exit" placeholder="Exit QR"
                    name="Exit_Qr"
                    value={qrData.Exit_Qr}
                    onChange={changeHandler}
                    className="bg-base-100 50 p-2"
                />

                <button type="submit" className="bg-gradient-to-bl from-blue-600 to-red-500 p-2 rounded shadow-2xl shadow-black hover:bg-gradient-to-l" >Add QR Data</button>
            </form>
        </div>
    );
}

export default AddEntryExitQr;
