/* global MESSAGES */

window.mdc.autoInit()

// Flash Messages
const MDCSnackbar = mdc.snackbar.MDCSnackbar
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))

for (let type in MESSAGES) {
  MESSAGES[type].forEach(mes => snackbar.show({message: `${type.toUpperCase()}: ${mes}`}))
}

// MODALS

// [...document.querySelectorAll('[data-show-modal')].forEach(el => {
//   el.addEventListener('click', (e) => {
//     document.querySelector(e.currentTarget.getAttribute('href')).showModal();
//   });
// });

// [...document.querySelectorAll('[data-close-modal]')].forEach(el => {
//   el.addEventListener('click', (e) => {
//     e.currentTarget.closest('.mdl-dialog').close();
//   });
// });
