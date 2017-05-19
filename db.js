const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'REACT2703',
    password: 'khoapham',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

function queryDB(sql, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err, undefined);
        client.query(sql, (errQuery, result) => {
            done(errQuery);
            if (errQuery) return cb(errQuery, undefined);
            cb(undefined, result);
        });
    });
}

module.exports = queryDB;

const signUp = (email, password, name, address, phone, cb) => {
    const sql = `INSERT INTO public."User"(email, password, name, phone, address)
	VALUES ('S${email}', '${password}', '${name}', '${phone}', '${address}');`
    queryDB(sql, (err, result) => {
        
    });
};
