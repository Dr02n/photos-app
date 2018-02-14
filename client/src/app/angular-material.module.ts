import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material'

const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class AngularMaterialModule { }
