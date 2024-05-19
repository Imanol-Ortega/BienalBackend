import { pool } from "../../db.js";
import { COLORS } from "../../config.js";
import axios from "axios";

let indiceColor = 0;

export const solicitarParticipante = async(req,res)=>{
    try {
        const apiDatos = await axios.get(`https://biecat.org.py/api/conf1/${req.params.ci}`);
        const datos = apiDatos.data

        if(!datos){
            return res.status(200).json({existe:false});
        }
        const colorAsignado = COLORS[indiceColor];
        indiceColor = (indiceColor +1) % 4;

        const result = await pool.query('INSERT INTO participantes (participantenombre,participantedoc,participantetel,participantecolor,participanteobs) VALUES($1,$2,$3,$4,$5)',
                                        [datos[0].nombre,datos[0].num_ci,datos[0].telefono,colorAsignado,datos[0].observaciones]);

       
        return res.status(200).json({data:`color ${colorAsignado}`,existe:true});

    } catch (error) {
        return res.status(500).json({message:`Ocurrio el siguiente error ${error.message}`});
    }
}


export const guardarParticipante = async(req,res)=>{
    try {
        const resp = req.body;
        const colorAsignado = COLORS[indiceColor];
        indiceColor = (indiceColor +1) % 4;
        const result = await pool.query('INSERT INTO participantes (participantenombre,participantedoc,participantetel,participantecolor,participanteobs) VALUES($1,$2,$3,$4,$5)',
                                        [resp.nombre,resp.nrodocumento,resp.telefono,colorAsignado,resp.observacion]);

       
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