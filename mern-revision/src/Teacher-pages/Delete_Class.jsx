import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer,toast } from "react-toastify";

const BASE_URl = "http://localhost:3000/codesy/v1"

function DeleteCourse({ props }) {

    const [courseIs, setCourseId] = useState(null);
    useEffect (() =>{
        setCourseId(props)
    },[])
    
    const deleteCourse = async (courseIs) => {        
        try {
            const response = await fetch(`${BASE_URl}/delete-course/${props}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                console.log("response",response)
                return response
            }

            const result = await response.json();
            if(result.success){
                toast.success(result.message);
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };


    return (
        <div>
            <div className=" relative flex border-2 border-red-600  rounded-2xl h-10 text-white text-2xl font-bold justify-center content-center hover:bg-amber-800">
            <button onClick={deleteCourse} className="bg-red-600 rounded-2xl"><RiDeleteBin5Fill /></button>
            
        </div>
        <ToastContainer />
        </div>
    )
}
export default DeleteCourse;