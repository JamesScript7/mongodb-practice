var update = document.getElementById('update');

update.addEventListener('click', function() {

  fetch('posts', {
    method: 'put',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      'title': 'All your base are belong to us',
      'body': 'We took it over!'
    })
  })

});
