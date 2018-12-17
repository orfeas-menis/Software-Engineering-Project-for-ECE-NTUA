module.exports = {
    host: process.env.HOST || "localhost",
    database: {
        db_name: process.env.DB_NAME || "soft_eng_data",
        username: process.env.DB_USER ||"orfeas",
        password: process.env.DB_PASS || "orfeas"
    },
    admin_user: {
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASS || "admin",
        email: process.env.ADMIN_EMAIL || "admin@admin.com",
        category: process.env.ADMIN_CATEGORY || '0'
    },
    simple_user: {
        username: 'anonymous', //find a way to autoincrement a number next to anonymous
        category: '1'
    }
}

