const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");
const app  = require("./app.js");

dotenv.config({
    path: "./.env"
});

//console.log('Cloudinary Config:', process.env.CLOUDINARY_CLOUD_NAME);

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})