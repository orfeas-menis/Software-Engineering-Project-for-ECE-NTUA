module.exports = {
    host: process.env.HOST || "localhost",
    database: {
        db_name: process.env.DB_NAME || "soft_eng_data",
        username: process.env.DB_USER ||"orfeas",
        password: process.env.DB_PASS || "orfeas"
    }
}

