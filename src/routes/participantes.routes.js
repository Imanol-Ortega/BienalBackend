import { Router } from "express";
import { guardarParticipante,obtenerParticipantes } from "../controllers/participantes.controller.js";

const router = Router();

router.get('/participantes',obtenerParticipantes);

router.post('/participantes',guardarParticipante);

router.put('participantes',);


export default router;