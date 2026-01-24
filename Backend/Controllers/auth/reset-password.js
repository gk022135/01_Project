const userModel = require("../../Models/UserSchema");
const teacherModel = require("../../Models/AdminModel");
const bcrypt = require("bcrypt");
const generateSixDigitOTP = require("../OtpGenerator");
const EmailSendToUser = require("../EmailToUser");

const client = require("../../client");


async function ResetPasswordCtrl(req, res) {
    try{
        const {email, newPassword} = req.body;
        console.log("ResetPasswordCtrl called with:", email, newPassword);

        if(!email || !newPassword){
            return res.status(400).json({
                message : "Please provide email and new password",
                success : false
            })
        }

        //check email exists in any of models
        let user = await userModel.findOne({email});
        let isTeacher = false;
        if(!user){
            user = await teacherModel.findOne({email});
            isTeacher = true;
        }
        
        if(!user){
            return res.status(404).json({
                message : "Email not found",
                success : false
            })
        }
        //hash new password
        const salt  = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(newPassword, salt);

        //Generate otp for email varifiction
        const otp = generateSixDigitOTP();
        console.log("Generated OTP for password reset:", otp);

        // send email with otp
        const emailResponse = EmailSendToUser(email, otp);
        if(!emailResponse){
            return res.status(500).json({
                message : "Failed to send OTP email",
                success : false
            })
        }

        //store otp in redis with email as key
        await client.set(`reset-otp:${email}`, otp, 'EX', 300); //otp valid for 5 minutes

        //store new hashed password in redis temporarily
        await client.set(`new-pass:${email}`, hashPass, 'EX', 300); //valid for 5 minutes

        return res.status(200).json({
            message : "OTP sent to email for password reset",
            success : true
        })
    }
    catch(error){
        console.error("Error in ResetPasswordCtrl:", error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

module.exports = ResetPasswordCtrl;