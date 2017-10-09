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
  '#add-album',
  '#edit-album',
  '#add-photos'
].map(selector => {
  try {
    const dialog = new mdc.dialog.MDCDialog(document.querySelector(selector))
    document.querySelector(`[data-href="${selector}"]`).addEventListener('click', evt => {
      evt.preventDefault()
      dialog.lastFocusedTarget = evt.target
      dialog.show()
    })
    dialog.listen('MDCDialog:accept', () => {
      // console.log('accepted')
      if (selector === '#add-photos') {
        location.reload()
      }
    })

    dialog.listen('MDCDialog:cancel', () => {
      // console.log('canceled')
      if (selector === '#add-photos') {
        location.reload()
      }
    })
    return dialog
  } catch (err) {
    // console.error(err)
    return null
  }
})

//  Menus
const menus = [
  '.mdc-simple-menu'
].map(selector => {
  try {
    let menu = new mdc.menu.MDCSimpleMenu(document.querySelector(selector))
    // Add event listener to some button to toggle the menu on and off.
    document.querySelector(`[data-toggle-menu="${selector}"]`)
      .addEventListener('click', () => { menu.open = !menu.open })
    return menu
  } catch (err) {
    // console.error(err)
    return null
  }
})
