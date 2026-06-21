const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

connectDB().catch(error => console.log(`❌ MongoDB Connection Failed: ${error}`));

app.use(express.json());

const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const roleRoute = require("./routes/roleRoute");

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", roleRoute);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
});