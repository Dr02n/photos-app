import { Injectable } from '@angular/core'

@Injectable()
export class LoggerService {
    constructor(
        private color: string = 'black',
        private title: string = ''
    ) { }

    getLogger(...args) {
        return new LoggerService(...args)
    }

    log(key: string, value: any) {
        console.log(`%c ${this.title}.${key}:`, `color: ${this.color}`, value)
    }
}
