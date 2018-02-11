import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
// import { StoreModule, ActionReducer } from '@ngrx/store'
// import { storeLogger } from 'ngrx-store-logger'
// import { EffectsModule } from '@ngrx/effects'

import { environment } from '../environments/environment'
import { AngularMaterialModule } from './angular-material.module'
import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component'
import { AppHeaderComponent } from './app-header.component'

// export function logger(reducer: ActionReducer<any>): any {
//   return storeLogger()(reducer)
// }

// export const metaReducers = environment.production ? [] : [logger]

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    AngularMaterialModule,
    AuthModule,
    // StoreModule.forRoot({}, { metaReducers }),
    // EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
