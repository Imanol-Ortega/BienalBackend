import { pool } from "../../db.js";

export const participanteRegistrados = async (ci,actividad)=>{
    const exiteParticipante = await pool.query(
        'SELECT * FROM participantes WHERE participantedoc = $1 AND participanteactividad = $2 ',
        [ci,actividad]
    );
    return exiteParticipante.rows.length
}