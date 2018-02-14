export class LocalStorageItem {
  constructor(private key) { }

  get value () {
    return localStorage.getItem(this.key)
  }

  set value (data) {
    if (data) {
      localStorage.setItem(this.key, data)
    } else {
      localStorage.removeItem(this.key)
    }
  }
}
