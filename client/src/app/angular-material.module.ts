import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material'


const MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class AngularMaterialModule { }
