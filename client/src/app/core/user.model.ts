export class User {
  _id: string
  email: string

  constructor(obj: any) {
    this._id = obj._id
    this.email = obj.email
  }
}
