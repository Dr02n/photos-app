import { Injectable } from '@angular/core'

@Injectable()
export class LoggerService {
    constructor(
        private color: string = 'black',
        private title: string = '_'
    ) { }

    create(color: string, title: string) {
        return new LoggerService(color, title)
    }

    log(key: string, value: any) {
        console.log(`%c ${this.title}.${key}:`, `color: ${this.color}`, value)
    }
}
