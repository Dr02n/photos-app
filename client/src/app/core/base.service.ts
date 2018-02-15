import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'

export class BaseService {
  protected httpOptions

  constructor(headers) {
    this.httpOptions = {
      headers: new HttpHeaders(headers)
    }
  }

  protected handleError(error: HttpErrorResponse) {
    console.error('Error:', error.error)

    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.')
  }
}
