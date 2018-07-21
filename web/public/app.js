const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];

devices.forEach(function(device) {
$('#devices tbody').append(`
<tr>
<td>${device.user}</td>
<td>${device.name}</td>
</tr>`
);
});



$('#add-device').on('click', function() {
const user = $('#user').val();
const name = $('#name').val();
devices.push({ user, name });
localStorage.setItem('devices', JSON.stringify(devices));
location.href = '/';
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
