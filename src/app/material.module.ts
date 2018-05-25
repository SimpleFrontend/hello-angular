import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
