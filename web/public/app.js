//const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const API_URL = 'http://localhost:5000/api';
/*
$.get('http://localhost:3001/devices')
.then(response => {
console.log(response);
})
.catch(error => {
console.log(`Error: ${error}`);
});
*/

$.get(`${API_URL}/devices`)
.then(response => {
  response.forEach(device => {
    $('#devices tbody').append(`
      <tr>
      <td>${device.user}</td>
      <td>${device.name}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});



/*
devices.forEach(function(device) {
$('#devices tbody').append(`
<tr>
<td>${device.user}</td>
<td>${device.name}</td>
</tr>`
);
});
*/

/*
$('#add-device').on('click', function() {
const user = $('#user').val();
const name = $('#name').val();
devices.push({ user, name });
localStorage.setItem('devices', JSON.stringify(devices));
location.href = '/';
});
*/
$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const sensorData = [];
  const body = {
    name,
    user,
    sensorData
  };
  $.post(`${API_URL}/devices`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$('#send-command').on('click', function() {
  const command = $('#command').val();
  console.log(`command is: ${command}`);
});

$('#navbar').load('navbar.html');

$('#footer').load('footer.html');

$('#submit_registration').on('click', function() {

  const email = $('#email_address').val();
  const password = $('#password').val();
  const confirm = $('#confirm').val();

  console.log(email);
  console.log(password);
  console.log(confirm);

  const exists = users.find((user) => {

    return user.email === email;

  });

  if(exists)
  {
    alert("email already exists!");
  }
  else
  {
    if(password.localeCompare(confirm) === 0)
    {
      users.push({email, password});
      localStorage.setItem('users', JSON.stringify(users));
      location.href = 'login.html';
    }
    else
    {
      alert("passwords do not match!");
    }
  }


});


$('#submit_login').on('click', function() {

  const email = $('#email_address').val();
  const password = $('#password').val();
  var userObj = {};

  console.log(email);

  const exists = users.find((user) => {

    userObj = user;
    return user.email === email;

  });

  if(!exists)
  {
    alert("The user doesn't exist!");
  }
  else
  {

    const localUserPwd = userObj.password;

    if(localUserPwd.localeCompare(password) === 0)
    {
      localStorage.setItem('isAuthenticated', true);
      location.href = '/';
    }
    else
    {

      alert("The password is incorrect!");

    }
  }

});

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  location.href = '/login.html';
}
