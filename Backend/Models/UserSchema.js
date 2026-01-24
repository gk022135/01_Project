const mongoose = require('mongoose');

// Activity Subschema
const ActivitySchema = new mongoose.Schema({
    Activite: { type: String, required: true },
    doneAt: {
        type: String,
        required: true,
        // validate: {
        //     validator: function(value) {
        //         return value.length === 120;  // your custom rule
        //     },
        //     message: "doneAt must be exactly 6 characters"
        // }
    }
}, { _id: false }); // Remove internal _id for cleaner array objects


//------------------------------
//Followers & Followings
//------------------------------
const followerSchema = new mongoose.Schema({
    followedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateOfFollow: { type: String, required: true },
    followInvitationStatus: { type: Boolean, required: true, default: false }
});

const followingSchema = new mongoose.Schema({
    followedByYou: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateOfFollowing: { type: String, required: true },
    isAccepted: { type: Boolean, required: true, default: false }
});


// Define Main User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "" },
    googleId: { type: String, default: null },

    userPost: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    currentTask: { type: Array, default: [] },
    completedTask: { type: Array, default: [] },

    description: { type: String },
    location: { type: String },
    github: { type: String },
    linkedin: { type: String },

    skills: { type: [String], default: [] },

    stats: {
        views: { type: Number, default: 0 },
        posts: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    },

    // --- Correct Activities Schema ---
    recentActivities: {
        activities: {
            type: [ActivitySchema],

            // Optional: limit array size
            validate: {
                validator: function (arr) {
                    return arr.length <= 10;  // ⬅ Change "10" to your desired limit
                },
                message: "You can store a maximum of 10 recent activities"
            }
        }
    },
    followers: { type: [followerSchema], default: [] },
    followings: { type: [followingSchema], default: [] },

});

// Convert Schema to Model
const User = mongoose.model('User', UserSchema);

module.exports = User;


