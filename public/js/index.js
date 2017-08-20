/* global messages */

const notification = document.querySelector('.mdl-js-snackbar');

// FLASH

docReady(() => {
  for (let type in messages) {
    messages[type].forEach((message) => notification.MaterialSnackbar.showSnackbar({message}));
  }
});

// MODALS

[...document.querySelectorAll('[data-show-modal')].forEach(el => {
  el.addEventListener('click', (e) => {
    document.querySelector(e.currentTarget.getAttribute('href')).showModal();
  });
});

[...document.querySelectorAll('[data-close-modal]')].forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.closest('.mdl-dialog').close();
  });
});

// UTILS

function docReady(f) {
  /in/.test(document.readyState) ? setTimeout(() => docReady(f), 9) : f();
}
