import dotenv from "dotenv";
import express from "express";
import userRoutes from "../BackEnd/src/routes/usersRoutes.js";
import contactsRoutes from "../BackEnd/src/routes/contactRoutes.js";
import connectDB from "../BackEnd/src/configMongoDB/dbConnection.js";
import errorHandler from "../BackEnd/src/middlewares/errorhandler.js";
// import cors from "cors"; 
dotenv.config(); 

connectDB();
const app = express();

app.use(express.json());
app.use(errorHandler)
app.use("/api/contacts", contactsRoutes);
app.use("/api", userRoutes);

// const port = parseInt(process.env.PORT);
const port = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;