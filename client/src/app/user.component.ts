import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-user',
  template: `
    <div class="user-banner"></div>
    <div class="user-header-wrap">
      <div class="container">
        <div class="user-header">
          <div class="user-header__avatar">
            <img
              src="https://yt3.ggpht.com/-guhCsaHCn8k/AAAAAAAAAAI/AAAAAAAAAAA/3UIrUtYooAQ/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"
              width="80"
              height="80"
            >
          </div>
          <div class="user-header__text">
            <h1>User component</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque possimus dolore rem deserunt labore quo.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['user.component.scss']
})

export class UserComponent implements OnInit {
  @Input() user: any

  constructor() { }

  ngOnInit() { }
}
