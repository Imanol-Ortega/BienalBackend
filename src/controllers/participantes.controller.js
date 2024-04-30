import { pool } from "../../db.js";

export const guardarParticipante = async(req,res)=>{
    try {
        const resp = req.body;

        const result = await pool.query('INSERT INTO participantes (participantenombre,participantecolor,participanteinstitucion) VALUES($1,$2,$3)',
                                        [resp.nombre,resp.color,resp.institucion]);

        return res.status(200).json({data:`color ${resp.color}`})
    } catch (error) {
        return res.status(500).json({message:`Ocurrió el siguiente error ${error.message}`})
    }
};

export const obtenerParticipantes = async(req,res)=>{
    try {
        
        const result = await pool.query('SELECT * FROM participantes');

        return res.status(200).json({data:result.rows})

    } catch (error) {
        return res.status(500).json({message:`Ocurrió el siguiente error ${error.message}`})
    }
}