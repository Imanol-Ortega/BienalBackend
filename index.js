import express from "express"
import cors from "cors"
import { PORT } from "./config.js"

import participantesRoutes from "./src/routes/participantes.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(participantesRoutes);

app.listen(PORT, ()=>{
    console.log(`SERVER LISTEN ON PORT ${PORT}`);
});