import { useEffect, useState } from "react";
import { RiImageFill } from "react-icons/ri";

function ImageUpload() {
    const Upload_Url = "http://localhost:3000/codesy/v1//upload-the-image";
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [email, setEmail] = useState("")


    useEffect( ()=>{
        const userInfo = localStorage.getItem("UserData");
        const userEmail = userInfo ? JSON.parse(userInfo).email : "";
        setEmail(userEmail);
        console.log("usremail", userEmail)
    }, [])


    // Allowed file types and max size (1MB)
    const supportedFileTypes = ["jpg", "jpeg", "png"];
    const maxSizeMB = 1 * 1024 * 1024; // 1MB in bytes

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const fileType = file.name.split(".").pop().toLowerCase();
        const fileSize = file.size;

        // Validate file type
        if (!supportedFileTypes.includes(fileType)) {
            alert("Unsupported file type! Please upload JPG, JPEG, or PNG.");
            return;
        }

        // Validate file size
        if (fileSize > maxSizeMB) {
            alert("File is too large! Max size allowed is 1MB.");
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const uploadToCloudinary = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        setUploading(true);


        //in inbuilt formData
        const formData = new FormData();
        formData.append("gkcloud", selectedFile);
        formData.append("email", email);


        try {
            const response = await fetch(Upload_Url, {
                method: "POST",
                body: formData,
            });
            console.log("ye upload wala maal hai", response)

            const Imagedata = await response.json();
            if (Imagedata.success) {
                const ImageObject = {
                    secure_url: Imagedata.data.secure_url,
                    public_id: Imagedata.data.public_id
                }
                localStorage.setItem("ImageData", JSON.stringify(ImageObject));
                alert("Image uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Something went wrong!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 bg-white/10 text-white rounded-md">
            <label className="cursor-pointer">
                <RiImageFill size={50} color="white" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {/* Image Preview */}
            {preview && (
                <div className="mt-2">
                    <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={uploadToCloudinary}
                disabled={uploading}
                className="mt-4 px-4 py-2 bg-blue-500 rounded text-white"
            >
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
}

export default ImageUpload;
