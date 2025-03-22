import express from 'express'; // using Es modules
import mongoose from 'mongoose'; 
import cors from 'cors';  // enable Cross-Origin Resource Sharing
import { nanoid } from 'nanoid';  // generate unique ids
import dotenv from 'dotenv';  // Loads environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
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

app.post('/api/short', async (req, res) => {
    try{
        const { originalUrl } = req.body;
        const shortUrl = nanoid(8);
        const url = new Url({ originalUrl, shortUrl });
        await url.save();
        return res.status(201).json({message : "Shortened URL created",url: url});
    } catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})    

app.listen(process.env.PORT, () => { 
    console.log(`Server running on port ${process.env.PORT}`); 
});