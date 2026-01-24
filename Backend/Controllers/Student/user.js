// controllers/user.controller.js
import UserModel from "../../Models/UserSchema.js";

export const getUserProfile = async (req, res) => {
  try {
    const encodedEmail = req.cookies?.user_email;

    if (!encodedEmail) {
      return res.status(401).json({
        success: false,
        message: "User email not found in cookies",
      });
    }

    const email = decodeURIComponent(encodedEmail);

    const user = await UserModel.findOne({ email }).select(
      "username image description location github linkedin skills stats followers followings"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};
