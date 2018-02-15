import { Pipe, PipeTransform } from '@angular/core'
import * as prettyBytes from 'pretty-bytes'

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return prettyBytes(parseInt(value, 10))
  }
}
