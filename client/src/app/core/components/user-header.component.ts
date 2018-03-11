import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-user-header',
  template: `
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <div class="avatar">
            <img [src]="placeholderImg" >
          </div>
          <div class="text">
            <h1>User Name</h1>
            <h3 class="bio">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
            <p>2 albums &middot; 10 photos</p>
          </div>
          <div class="actions">
            <ng-content></ng-content>
          </div>
        </div>
      </div>

      {{ user | json }}

    </div>
  `,
  styleUrls: ['user-header.component.scss']
})

export class UserHeaderComponent implements OnInit {
  @Input() user: any

  placeholderImg = 'http://placehold.it/120/e6e6e6?text=No%20Image'

  constructor() { }

  ngOnInit() { }
}
