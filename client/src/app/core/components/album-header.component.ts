import { Component, OnInit, Input } from '@angular/core'
import { Album } from '../album.model'

@Component({
  selector: 'app-album-header',
  template: `
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <h1>{{ album?.name }}</h1>
          <h3 *ngIf="album?.description">{{ album?.description }}</h3>
          <p>{{ photosCount }} photos</p>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['album-header.component.scss']
})

export class AlbumHeaderComponent implements OnInit {
  @Input() album: Album
  @Input() photosCount: number

  constructor() { }

  ngOnInit() { }
}
