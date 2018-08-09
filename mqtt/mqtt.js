const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { URL, USER, PASSWORD } = process.env;
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use(express.static(`${__dirname}`));

const client = mqtt.connect(URL, {
  username: USER,
  password: PASSWORD
});

client.on('connect', () => {
  console.log('mqtt connected');
});

/*
client.publish(topic, command, () => {
res.send('published new message');
});
*/

app.post('/send-command', (req, res) => {
  const { deviceId, command } = req.body;
  const topic = `/command/${deviceId}`;
  console.log("did this get here");
  client.publish(topic, command, () => {
    res.send(topic);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});