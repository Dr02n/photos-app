import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularMaterialModule } from '../angular-material.module'
import { AuthComponent } from './components/auth.component'
import { LoginComponent } from './components/login.component'
import { SignupComponent } from './components/signup.component'
import { AuthFormComponent } from './components/auth-form.component'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

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
    RouterModule.forChild(routes),
    AngularMaterialModule
  ],
  exports: [],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    AuthFormComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
