import { Component, OnInit, Input } from '@angular/core'
import { Album } from '../album.model'

@Component({
  selector: 'app-album-header',
  template: `
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <h2>{{ album?.name }}</h2>
          <p *ngIf="album?.description">{{ album?.description }}</p>
          <p>18 photos &middot; 12 likes &middot; 10 comments</p>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['album-header.component.scss']
})

export class AlbumHeaderComponent implements OnInit {
  @Input() album: Album

  constructor() { }

  ngOnInit() { }
}
