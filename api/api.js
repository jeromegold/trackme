const express = require('express');
const mongoose = require('mongoose');
const Device = require('./models/device');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(process.env.MONGO_URL);



app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
  });
});


app.post('/api/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
    ? res.send(err)
    : res.send('successfully added device and data');
  });
});

app.post('/api/send_command', (req, res) => {

  console.log(req.body.command);

});


app.get('/api/test', (req, res) => {
  res.send('The API is working!');

});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
