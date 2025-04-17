import express from 'express'; // using Es modules
import mongoose from 'mongoose'; 
import cors from 'cors';  // enable Cross-Origin Resource Sharing
import { nanoid } from 'nanoid';  // generate unique ids
import dotenv from 'dotenv';  // Loads environment variables from .env
dotenv.config();
import QRCode from 'qrcode';  // generate QR code

const app = express();
// app.use(cors());
app.use(cors({
    origin: "https://url-shortner-jarw.onrender.com"
  })); // enable CORS for the frontend URL
app.use(express.json()); // parse JSON bodies

mongoose.connect(process.env.DATABASE_URL)
     .then(() => console.log('Connected to MongoDB'))
     .catch(err => console.log(err));

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: {
        type: Number,
        default: 0
    },
});  

const Url = mongoose.model('Url', urlSchema);

app.post('/api/short', async (req, res) => {  // async for db operations
    try{
        const { originalUrl } = req.body;
        if(!originalUrl){
            return res.status(400).json({message : "Please enter a valid URL"});
        }
        const shortUrl = nanoid(8);   // generate a random 8 character string
        const url = new Url({ originalUrl, shortUrl });
        // const myurl = `http://localhost:3001/${shortUrl}`
        const myurl = `https://url-shortner-huig.onrender.com/${shortUrl}`;
        const qrcodeimage = await QRCode.toDataURL(myurl)
        await url.save();
        return res.status(201).json({message : "Shortened URL created", shorturl: myurl, qrcodeimage});
    } catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

app.get('/:shortUrl', async (req, res) => {  // redirect to original URL
    try{
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl }); //
        if(url){
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        }
        else{
            return res.status(404).json({message : "URL not found"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); 
});
