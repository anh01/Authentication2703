const { sign, verify } = require('jsonwebtoken');

const KEY = 'kashbds932dBBT5272d//;s'

// sign({ id: 3 }, KEY, { expiresIn: 40 }, (err, token) => {
//     console.log(token);
// });

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNDk1NjIzNTk4LCJleHAiOjE0OTU2MjM2Mzh9.LyVkPDVN39qErSfg6r83NC1tGq8rJSZsP385gy9YtYw'

// verify(token, KEY, (err, obj) => {
//     console.log(obj)
// });

function getTokenFromEmail(email, cb) {
    sign({ email }, KEY, { expiresIn: '1d' }, (err, token) => {
        cb(err, token);
    });
}

function getEmailFromToken(token, cb) {
    verify(token, KEY, (err, obj) => {
        if (err) return cb(err);
        cb(undefined, obj.email);
    });
}

module.exports = { getTokenFromEmail, getEmailFromToken }
