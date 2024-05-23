import { pool } from "../../db.js";
import { COLORS } from "../../config.js";
import axios from "axios";
import { participanteRegistrados } from "../utils/participantesYaRegistrados.js";

let indiceColor = 0;

export const solicitarParticipante = async (req, res) => {
    try {
        const { ci } = req.params;

        const response = await axios.get(`https://biecat.org.py/api/conf1/${ci}`);
        const datos = response.data;
        
        if (datos === 'No hay Resultados') {
            return res.status(200).json({ existe: false });
        }

        const yaRegistrado = await participanteRegistrados(Number(ci), datos[0].actividad);
        if (yaRegistrado) {
            return res.status(200).json({ data: 'Ya registrado', existe: true });
        }

        const colorAsignado = COLORS[indiceColor];
        indiceColor = (indiceColor + 1) % COLORS.length;
        await pool.query('INSERT INTO participantes (participantenombre,participantedoc,participantetel,participantecolor,participanteobs,participanteactividad) VALUES($1,$2,$3,$4,$5,$6)', [
            datos[0].nombre,
            datos[0].num_ci,
            datos[0].telefono,
            colorAsignado,
            datos[0].observaciones,
            datos[0].actividad
        ]);

        return res.status(200).json({ data: `Color asignado: ${colorAsignado}`, existe: true });

    } catch (error) {
        console.error('Error al solicitar el participante:', error);
        return res.status(500).json({ message: `Ocurrió el siguiente error: ${error.message}` });
    }
};


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