import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import dbConnect from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";
import adminRouter from "./routes/admin.js";
import medicineRouter from "./routes/medicine.js";
import shopRouter from "./routes/shop.js";

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(cookieParser());

app.use("/admin", adminRouter);
app.use(medicineRouter);
app.use(shopRouter);

app.use(errorHandler);
dbConnect.then(() => {
  console.log("connection successfully established with the database!");
  app.listen(port, host, err => {
    if(!err){
      console.log(`server started at http://${host}:${port}`);
    }else{
      console.log("something went wrong, unable to start the server!");
    }
  })
}).catch(err => {
  console.log(err.message);
  throw new Error("sorry, unable to connect with the database!");
})