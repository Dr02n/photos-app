import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'

export class BaseService {
  constructor(private authService) { }

  get httpOptions() {
    return {
      headers: new HttpHeaders(this.authService.headers)
    }
  }

  protected handleError(error: HttpErrorResponse) {
    console.error('Error:', error.error)
    return new ErrorObservable('Something bad happened; please try again later.')
  }
}
