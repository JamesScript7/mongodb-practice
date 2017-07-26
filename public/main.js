var update = document.getElementById('update');
update.addEventListener('click', function() {

  fetch('posts', {
    method: 'put',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      title: "All your base...",
      body: "Are belong to us!!!"
    })
  }).then(res => {
    if(res.ok) return res.json()
  }).then(data => {
    window.location.reload(true);
  });

});

var del = document.getElementById('delete');
del.addEventListener('click', function() {

  fetch('posts', {
    method: 'delete',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      title: "All your base..."
    })
  }).then(res => {
    if (res.ok) return res.json();
  }).then(data => {
    console.log(data);
    window.location.reload();
  });


})
