import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-user-header',
  template: `
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <div class="avatar">
            <img src="http://placehold.it/80/80" >
          </div>
          <div class="text">
            <h1>User component</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['user-header.component.scss']
})

export class UserHeaderComponent implements OnInit {
  @Input() user: any

  constructor() { }

  ngOnInit() { }
}
