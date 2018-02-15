import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { User } from './auth/auth.service'

@Component({
  selector: 'app-header',
  template: `
    <mat-menu #appMenu="matMenu">
      <button mat-menu-item>Settings</button>
      <button mat-menu-item (click)="logout.emit()">Logout</button>
    </mat-menu>

    <mat-toolbar color="primary" class="app-header mat-elevation-z4">
      <a routerLink="/" mat-button>My Photos App {{ url$ | async }}</a>
      <div class="spacer"></div>

      <a routerLink="/users/me" mat-button *ngIf="user">{{ user.email }}</a>
      <button mat-icon-button [matMenuTriggerFor]="appMenu" *ngIf="user">
        <mat-icon>more_vert</mat-icon>
      </button>

      <a routerLink="/auth/login" mat-button *ngIf="!user && url !== '/auth/login'">Log in</a>
      <a routerLink="/auth/signup" mat-button *ngIf="!user && url !== '/auth/signup'">Sign up</a>
    </mat-toolbar>
  `,
  styles: [`
    .app-header {
      position: relative;
      z-index: 10;
    }
  `]
})

export class AppHeaderComponent implements OnInit {
  @Input() user: User
  @Input() url: string

  @Output() logout = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }
}
