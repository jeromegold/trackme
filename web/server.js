const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', function (req, res) {
res.sendFile(`${base}/device_list.html`);
});

app.listen(port, () => {
console.log(`listening on port ${port}`);
});

app.post('/register.html', function (req, res) {
  res.sendFile(`${base}/register.html`);
})

app.post('/login.html', function (req, res) {
  res.sendFile(`${base}/register.html`);
})

app.get('*', (req, res) => {
res.sendFile(`${base}/404.html`);
});
