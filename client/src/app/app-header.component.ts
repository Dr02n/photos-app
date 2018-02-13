import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { User } from './auth/auth.service'

@Component({
  selector: 'app-header',
  template: `
    <header>
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <a routerLink="/" mat-button>My Photos App {{ url$ | async }}</a>
          <div class="spacer"></div>

          <a routerLink="/" mat-button *ngIf="user">{{ user.email }}</a>
          <button (click)="logout.emit()" mat-button *ngIf="user">Log out</button>

          <a routerLink="/auth/login" mat-button *ngIf="!user && url !== '/auth/login'">Log in</a>
          <a routerLink="/auth/signup" mat-button *ngIf="!user && url !== '/auth/signup'">Sign up</a>
        </mat-toolbar-row>
      </mat-toolbar>
    </header>
  `
})

export class AppHeaderComponent implements OnInit {
  @Input() user: User
  @Input() url: string

  @Output() logout = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }
}
