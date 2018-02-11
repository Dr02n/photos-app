import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'user-component',
  template: `
    <h1>User component</h1>
  `
})

export class UserComponent implements OnInit {
  @Input() user: any

  constructor() { }

  ngOnInit() { }
}
