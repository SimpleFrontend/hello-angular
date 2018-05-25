import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
