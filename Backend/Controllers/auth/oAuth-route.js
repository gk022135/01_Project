import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const Oauth_router = express.Router();

//  STEP 1: frontend hits this
Oauth_router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// STEP 2: Google redirects HERE
Oauth_router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user.googleId, email: user.email },
      process.env.JWT_SECRETE,
      { expiresIn: "1d" }
    );

    // auth cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // identity cookie (NOT secure)
    res.cookie("user_email", encodeURIComponent(user.email), {
      httpOnly: false, // JS-accessible
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.redirect("http://localhost:5173/oauth-success");
  }
);


export default Oauth_router;
