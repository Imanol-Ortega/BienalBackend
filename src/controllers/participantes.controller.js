import { pool } from "../../db.js";
import { COLORS } from "../../config.js";

let indiceColor = 0;

export const solicitarParticipante = async(req,res)=>{
    try {
        
        

        return res.status(200).json({existe:false});

    } catch (error) {
        return res.status(500).json({message:`Ocurrio el siguiente error ${error.message}`});
    }
}


export const guardarParticipante = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO participantes (participantenombre,participantedoc,participantetel,participantecolor,participanteobs) VALUES($1,$2,$3,$4,$5)',
                                        [resp.nombre,resp.nrodocumento,resp.telefono,resp.color,resp.observacion]);

        const colorAsignado = COLORS[indiceColor];
        indiceColor = (indiceColor +1) % 4;
        return res.status(200).json({data:`color ${colorAsignado}`})
    } catch (error) {
        return res.status(500).json({message:`Ocurrió el siguiente error ${error.message}`});
    }
};

export const obtenerParticipantes = async(req,res)=>{
    try {
        
        const result = await pool.query('SELECT * FROM participantes');

        return res.status(200).json({data:result.rows});

    } catch (error) {
        return res.status(500).json({message:`Ocurrió el siguiente error ${error.message}`});
    }
}