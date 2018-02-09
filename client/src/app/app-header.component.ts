import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/switchMap'

import { User } from './auth/interfaces'

@Component({
  selector: 'app-header',
  template: `
    <header>
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <a routerLink="/" mat-button>My App</a>
          <div class="spacer"></div>

          <a routerLink="/" mat-button *ngIf="user">{{user.email}}</a>
          <button (click)="logout.emit()" mat-button *ngIf="user">Log out</button>

          <a routerLink="/auth/login" mat-button *ngIf="!user">Log in</a>
          <a routerLink="/auth/signup" mat-button *ngIf="!user">Sign up</a>
        </mat-toolbar-row>
      </mat-toolbar>
    </header>
  `
})

export class AppHeaderComponent implements OnInit {
  @Input() user: User

  @Output() logout = new EventEmitter<any>()

  constructor(private route: ActivatedRoute) { }

  ngOnInit() { }
}
