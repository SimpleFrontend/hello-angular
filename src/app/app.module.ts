import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddNewComponent } from './add-new/add-new.component';
import { TitleComponent } from './title/title.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, ListComponent, AddNewComponent, TitleComponent, TableComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
