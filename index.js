const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('HELLO'));

app.listen(3000, () => console.log('Server started'));

//Man hinh dang ky
//Man hinh dang nhap
//Man hinh public
//Man hinh private
