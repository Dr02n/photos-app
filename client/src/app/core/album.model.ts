import { User } from './user.model'
import { Photo } from './photo.model'

export interface Album {
  _id: string,
  name: string,
  description: string,
  author: User,
  photos: Photo[],
  photosCount: number
}
