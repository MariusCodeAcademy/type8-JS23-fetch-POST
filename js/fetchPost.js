console.log('fetch post');

// 1. nusitaikyti i forma
const formEl = document.forms[0];

// 2. uzdeti submit event listeneri
formEl.addEventListener('submit', (e) => {
  // 3. sustabdyti formos siuntima su perkrovimu
  e.preventDefault();
  console.log('js in control');
  const newPost = {
    title: formEl.elements.title.value,
    body: formEl.elements.body.value,
    userId: +formEl.elements.userId.value,
  };
  console.log('newPost ===', newPost);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newPost),
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (!resp.ok) {
        throw new Error('nepavyko sukurti');
      }
      return resp.json();
    })
    .then((ats) => {
      // sekmingas sukurimas
      formEl.reset();
      showAlert('Postas sukurtas');
    })
    .catch((err) => {
      console.log(err.message);
      showAlert('Klaida, Postas nesukurtas', 'fail');
    });
});

// 4. surinkit inputu reiksmes ir sudeti i objekta

// 5. siusti naujo post duomenis su fetch
function showAlert(msg, tipas) {
  // <h3 class="alert">Postas sukurtas</h3>
  // parodyti laikinai sekmes pranesima
  const alertEl = document.createElement('h3');
  const extraClass = tipas === 'fail' ? 'danger' : '';
  alertEl.className = 'alert ' + extraClass;
  alertEl.textContent = msg;
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}
// function showFailAlert() {
//   // parodyti pranesima
//   const alertEl = document.createElement('h3');
//   alertEl.className = 'alert danger';
//   alertEl.textContent = 'Klaida, Postas nesukurtas';
//   document.body.prepend(alertEl);
//   setTimeout(() => {
//     alertEl.remove();
//   }, 3000);
// }
