import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import stableDiffusion from './routes/dalle.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }))

app.use('/api/v1/stable-diffusion', stableDiffusion)

app.get('/', (req, res)=>{
    res.status(200).json({message: "Hello from the DALL.E"})  
})

app.listen(8080, ()=> console.log("server has started on port 8080"))  // 8080 is the port number
