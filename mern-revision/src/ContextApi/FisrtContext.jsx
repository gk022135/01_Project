import { useContext, createContext, useState } from "react";

const BASE_URL = "http://localhost:3000/codesy/v1";
const BASE_URL_GET = "http://localhost:3000/codesy/v1/get"
const BASE_URL_PUT = "http://localhost:3000/codesy/v1/put"

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false); // Fixed typo (flase → false)

    async function SendDataSignLogin(Api_url, DataObjectToSend) {
        setLoading(true);

        const URL = `${BASE_URL}/${Api_url}`;
        console.log("requestes", URL);

        try {
            const result = await fetch(URL, {
                method: "POST",
                credentials: "include", //Ensures cookies are sent and received
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(DataObjectToSend),
            });

            const fetchResponse = await result.json(); // Await the response JSON
            console.log("Response from backend:", fetchResponse); // Log to check data
            return fetchResponse;
        } catch (error) {
            console.error("Error in fetching:", error);
            return { success: false, message: "Request failed", error }; // Return error response
        } finally {
            setLoading(false);
        }
    }
    async function AllGetReq(Api_url, queryParams = {}) {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const newUrl = `${BASE_URL_GET}/${Api_url}${queryString ? `?${queryString}` : ""}`;
    
            console.log("GET URL:", newUrl);
    
            const result = await fetch(newUrl, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
    
            const responseData = await result.json();
    
            // Check for HTTP errors but return the response instead of throwing
            if (!result.ok) {
                console.warn(`HTTP Error: ${result.status} - ${responseData.message}`);
                return responseData; // Return response even if it's an error
            }
    
            return responseData; // Normal success case
    
        } catch (error) {
            console.error("Error in AllGetReq:", error);
            return { success: false, message: "Error fetching data" };
        }
    }
    


    async function PutRequets(courseId, updatedData, Api_url) {
        console.log("id context mein aya", courseId)
        try {
            const NewUrl = `${BASE_URL}/put/${Api_url}/${courseId}`
            const response = await fetch(NewUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();
            if (data.success) {
                console.log("Course updated:", data);
                return data;
            } else {
                console.error("Failed to update course:", data.message);
            }
        } catch (error) {
            console.error("Error in updating course:", error);
        }
    }


    const value = {
        loading,
        setLoading,
        SendDataSignLogin,
        AllGetReq,
        PutRequets
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
