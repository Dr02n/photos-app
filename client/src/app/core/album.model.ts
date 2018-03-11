export class Album {
  _id: string
  name: string
  description: string
  author: any // id or object
  photos: string[]
  photosCount: number

  constructor(obj: any) {
    this._id = obj._id
    this.name = obj.name
    this.description = obj.description
    this.author = obj.author
    this.photos = obj.photos
    this.photosCount = obj.photosCount
  }
}
