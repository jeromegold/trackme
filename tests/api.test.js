const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const { API_URL } = process.env;

test('test device array', () => {

  expect.assertions(1);
  return axios.get(`${API_URL}/devices`)
  .then(resp => resp.data)
  .then(resp => {
    console.log(resp[0]);
    expect(resp[0].user).toEqual('alex');
  });
});

test('test device history', () => {

  expect.assertions(1);
  return axios.get(`${API_URL}/devices/5b593e61cb4de92771a3334c/device_history`)
  .then(resp => resp.data)
  .then(resp => {
    console.log(resp[0]);
    expect(resp[0].temp).toEqual(14);
  });
});
