const express = require('express');
const jsonParser = require('body-parser').json();
const { signIn, signUp } = require('./db');

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
    signIn(email, password, err => {
        if (err) return res.send('THAT_BAI');
        res.send('THANH_CONG');
    });
});

app.listen(3000, () => console.log('Server started'));

//Man hinh dang ky
//Man hinh dang nhap
//Man hinh public
//Man hinh private
