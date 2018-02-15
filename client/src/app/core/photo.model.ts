import { User } from './user.model'
import { Album } from './album.model'

export interface Photo {
  _id: string,
  author: User,
  album: Album,
  name: string,
  path: string,
  mimetype: string,
  size: string,
  description?: string
}
