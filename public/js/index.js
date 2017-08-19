const notification = document.querySelector('.mdl-js-snackbar');

r(() => {
  for (let type in messages) {
    messages[type].forEach((message) => notification.MaterialSnackbar.showSnackbar({message}));
  }
});

function r(f) {
  /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f();
}
