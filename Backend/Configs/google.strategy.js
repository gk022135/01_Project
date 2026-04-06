const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const UserModel = require("../Models/UserSchema.js");

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (clientID && clientSecret) {
    passport.use(
        new GoogleStrategy(
            {
                clientID,
                clientSecret,
                callbackURL: "http://localhost:3000/codesy/v1/auth/oauth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log("Google profile:", profile);
                    const existingUser = await UserModel.findOne({ googleId: profile.id });

                    if (!existingUser) {
                        const newUser = new UserModel({
                            googleId: profile.id,
                            email: profile.emails?.[0]?.value || "",
                            username: profile.displayName,
                            password: profile.id,
                            role: "normal-user",
                            image: profile.photos?.[0]?.value || "",
                        });

                        await newUser.save();
                        return done(null, newUser);
                    }

                    return done(null, existingUser);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );
} else {
    console.warn(
        "Google OAuth is disabled: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it."
    );
}
