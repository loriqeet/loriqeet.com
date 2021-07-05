var form = document.getElementById('contact-form');

async function handleSubmit(event) {

  event.preventDefault();

  var btn = document.getElementById('contact-form-button');
  var data = new FormData(event.target);

  btn.innerHTML = '<i class="spinner-border spinner-border-sm"></i> Sending...';
  btn.setAttribute('disabled', '');

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    btn.removeAttribute('disabled');
    btn.className = 'btn btn-success';
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent!';
    form.reset();
  }).catch(error => {
    btn.removeAttribute('disabled');
    btn.className = 'btn btn-danger';
    btn.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Error!';
  });

}

form.addEventListener('submit', handleSubmit)
