import express from 'express'
import mongoose from 'mongoose'
import { urlShort, getOriginalUrl } from "./controllers/url.js";
import dotenv from "dotenv"

const app = express();
dotenv.config();
const PORT=process.env.PORT
const mongourl=process.env.DB_URL
app.use(express.urlencoded({extended:true}));
mongoose.connect(mongourl).then(()=>{
  console.log("db connected successfully")
}).catch((error)=>console.log(error));
app.get('/',(req,res)=>{
    res.render("server.ejs",{shortUrl:null})
  })

  // handle url submission
  app.post("/shorten", urlShort);

  // redirect to original url using short url
  app.get("/:shortCode", getOriginalUrl);


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))