import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'mimetype'
})
export class MimetypePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace('image/', '')
  }
}
