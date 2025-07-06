const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_biblioteca ',
    password: '123456',
    port: 5432,
});


async function connect() {
    return await pool.connect();
}

module.exports = {
    connect,
};
