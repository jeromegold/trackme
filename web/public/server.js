const express = require('express');
const app = express();
const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', function (req, res) {
res.sendFile(`${base}/device_list.html`);
});

app.listen(port, () => {
console.log(`listening on port ${port}`);
});

app.get('/register-device', (req, res) => {
res.sendFile(`${base}/register_device.html`);
});
app.get('/send-command', (req, res) => {
res.sendFile(`${base}/send_command.html`);
});
app.get('/about', (req, res) => {
res.sendFile(`${base}/about_me.html`);
});

app.get('*', (req, res) => {
res.sendFile(`${base}/404.html`);
});
