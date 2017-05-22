const pg = require('pg');
const { hash, compare } = require('bcrypt');

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

const signUp = (email, password, name, address, phone, cb) => {
    hash(password, 8, (err, encypted) => {
        if (err) return cb(err);
        const sql = `INSERT INTO public."User"(email, password, name, phone, address)
        VALUES ('${email}', '${encypted}', '${name}', '${phone}', '${address}');`
        queryDB(sql, (err, result) => {
            if (err) return cb(err);
            cb();
        });
    });
};

const signIn = (email, password, cb) => {
    const sql = `SELECT password FROM "User" WHERE email = '${email}'`;
    queryDB(sql, (err, result) => {
        if (err) return cb(err);
        if (result.rows.length === 0) return cb(new Error('Email khong ton tai!'));
        const encypted = result.rows[0].password;
        compare(password, encypted, (err, same) => {
            if (err) return cb(err);
            if (!same) return cb(new Error('Sai password'));
            cb();
        });
    });
};

module.exports = { signIn, signUp };

// signUp('asssdafdfs@gmail.com', '123', 'Pho', '92 LTR', '012348217', err => {
//     console.log(err);
// });

// signIn('Sasssdafdfs@gmail.com', '123', err => console.log(err));
