import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../Models/UserSchema.js";
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            //   callbackURL: process.env.GOOGLE_CALLBACK_URL || `${process.env.BASE_URL || "http://localhost:3000"}/auth/google/callback`,
            callbackURL: "http://localhost:3000/codesy/v1/auth/oauth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // find or create user in DB
                console.log("Google profile:", profile);
                const user = {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                };
                const existingUser = await UserModel.findOne({ googleId: profile.id });
                if (!existingUser) {
                    // create new user
                    const newUser = new UserModel({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        password: profile.id, // Not secure, consider a better approach
                        role: "normal-user",
                        image: profile.photos[0]?.value || "",
                    });
                    await newUser.save();
                    return done(null, newUser);
                } else {
                    return done(null, existingUser);
                }   

                } catch (err) {
                return done(err, null);
            }
        }
    )
);
