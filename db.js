import pg from 'pg'

export const pool = new pg.Pool({
    user:"postgres",
    host: "localhost",
    database : "BieNal",
    password : "0985753512Acm",
    port: 5432
});