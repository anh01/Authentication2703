const express = require('express');
const jsonParser = require('body-parser').json();

const app = express();

app.get('/', (req, res) => res.send('HELLO'));

app.post('/dangky', jsonParser, (req, res) => {
    console.log(req.body.username);
    res.send('THANH_CONG');
});

app.listen(3000, () => console.log('Server started'));

//Man hinh dang ky
//Man hinh dang nhap
//Man hinh public
//Man hinh private
