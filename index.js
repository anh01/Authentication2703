const express = require('express');
const jsonParser = require('body-parser').json();
const { signIn, signUp, getUserInfo } = require('./db');
const { getEmailFromToken, getTokenFromEmail } = require('./jwt');

const app = express();

app.get('/', (req, res) => res.send('HELLO'));

app.post('/dangky', jsonParser, (req, res) => {
    const { name, password, address, phone, email } = req.body;
    signUp(email, password, name, address, phone, err => {
        if (err) return res.send('THAT_BAI');
        res.send('THANH_CONG');
    });
});

app.post('/dangnhap', jsonParser, (req, res) => {
    const { password, email } = req.body;
    signIn(email, password, (err, user) => {
        if (err) return res.send({ error: 'LOI DANG NHAP' });
        getTokenFromEmail(email, (err, token) => {
            res.send({ token, user });
        });
    });
});

app.post('/check', jsonParser, (req, res) => {
    const { token } = req.body;
    getEmailFromToken(token, (err, email) => {
        if (err) return res.send({ error: 'LOI Token' });
        getUserInfo(email, (err, user) => {
            if (err) return res.send({ error: 'LOI email' });
            res.send(user);
        });
    });
});

app.listen(3000, () => console.log('Server started'));

//Man hinh dang ky
//Man hinh dang nhap
//Man hinh public
//Man hinh private
