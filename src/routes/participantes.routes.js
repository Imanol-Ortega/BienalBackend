import { Router } from "express";
import { guardarParticipante,obtenerParticipantes,solicitarParticipante } from "../controllers/participantes.controller.js";

const router = Router();

router.get('/participantes/obtener',obtenerParticipantes);

router.post('/participantes/nocedula',guardarParticipante);

router.post('/participantes/cedula',solicitarParticipante)


export default router;