import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule, ActionReducer } from '@ngrx/store'
import { storeLogger } from 'ngrx-store-logger'
import { EffectsModule } from '@ngrx/effects'
import { environment } from '../environments/environment'
import { AngularMaterialModule } from './angular-material.module'
import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component'
import { AppHeaderComponent } from './app-header.component'
import { HomeComponent } from './home.component'
import { AuthGuard } from './auth/auth.guard'

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer)
}

export const metaReducers = environment.production ? [] : [logger]

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularMaterialModule,
    AuthModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
