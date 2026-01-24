const userModel = require("../../Models/UserSchema");
const teacherModel = require("../../Models/AdminModel");
const client = require("../../client");


async function ResetPassVarifyCtrl(req, res) {
    try{
        const {email, otp} = req.body;

        if(!email || !otp){
            return res.status(400).json({
                message : "Please provide email and otp",
                success : false
            })
        }

        //get otp from redis
        const storedOtp = await client.get(`reset-otp:${email}`);
        if(!storedOtp){
            return res.status(400).json({
                message : "OTP expired or not found",
                success : false
            })
        }

        if(storedOtp !== otp){
            return res.status(400).json({
                message : "Invalid OTP",
                success : false
            })
        }

        //get new hashed password from redis
        const newHashedPass = await client.get(`new-pass:${email}`);
        if(!newHashedPass){
            return res.status(400).json({
                message : "New password data expired or not found",
                success : false
            })
        }

        //update password in db
        let user = await userModel.findOne({email});
        let isTeacher = false;
        if(!user){
            user = await teacherModel.findOne({email});
            isTeacher = true;
        }

        if(isTeacher){
            user.password = newHashedPass;
            await user.save();
        }else{
            user.password = newHashedPass;
            await user.save();
        }

        //delete otp and new password from redis
        await client.del(`reset-otp:${email}`);
        await client.del(`new-pass:${email}`);

        return res.status(200).json({
            message : "Password reset successful",
            success : true
        })

    }catch(error){
        console.log("Error in ResetPassVarifyCtrl:", error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

module.exports = ResetPassVarifyCtrl;