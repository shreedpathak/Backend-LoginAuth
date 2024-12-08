import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide the name for the contact"]
    },
    email:{
        type: String,
        required: [true, "Please provide the email for the contact"]
    },
    phone:{
        type: String,
        required: [true, "Please provide the phone for the contact"]
    }
},{
    timestamps: true
})

export default mongoose.model("contact", contactSchema);