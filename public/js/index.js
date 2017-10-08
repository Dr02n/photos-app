/* global MESSAGES, mdc */

window.mdc.autoInit()

// Flash Messages
const MDCSnackbar = mdc.snackbar.MDCSnackbar
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))

for (let type in MESSAGES) {
  MESSAGES[type].forEach(mes => snackbar.show({message: `${type.toUpperCase()}: ${mes}`}))
}

// Toolbar
const toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'))
toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust')

// Dialogs
const dialogs = [
  '#edit-profile',
  '#add-album'
].map(selector => {
  try {
    const dialog = new mdc.dialog.MDCDialog(document.querySelector(selector))
    document.querySelector(`[href="${selector}"]`).addEventListener('click', function (evt) {
      evt.preventDefault()
      dialog.lastFocusedTarget = evt.target
      dialog.show()
    })
    return dialog
  } catch (err) {
    // console.error(err)
    return null
  }
})
