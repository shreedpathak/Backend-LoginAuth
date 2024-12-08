import mongoose from "mongoose"; 

const userSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username:{
        type: String,
        required: [true, "Username is a required field"]
    },
    email:{
        type: String,
        unique: [true, "email already exists"],
        required: [true, "Email is a required field"]
    },
    password:{
        type: String,
        required: [true, "Password is a required field"]
    },
},
{
    timestamps: true
});

export default mongoose.model("User", userSchema);