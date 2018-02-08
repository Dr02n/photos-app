import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AngularMaterialModule } from '../angular-material.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthFormComponent } from './auth-form.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    AuthFormComponent
  ],
  providers: [
    AuthService
  ],
})
export class AuthModule { }
