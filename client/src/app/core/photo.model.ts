export class Photo {
  _id: string
  author: string
  album: any // id or Album
  name: string
  path: string
  mimetype: string
  size: string
  description?: string

  constructor(obj: any) {
    this._id = obj._id
    this.author = obj.author
    this.album = obj.album
    this.name = obj.name
    this.path = obj.path
    this.mimetype = obj.mimetype
    this.size = obj.size
    this.description = obj.description || ''
  }
}
