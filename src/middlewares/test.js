import { currentUser, loginUser, registerUser } from "../controllers/userController.js";

const test = async (req,res,currentUser)=>{
    console.log("middleWare1");
}

export default test;