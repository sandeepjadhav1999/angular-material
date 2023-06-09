import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MAT_DATE_LOCALE ,DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BookingComponent } from './component/booking/booking.component';
import { BookingListComponent } from './component/booking-list/booking-list.component';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  },
}; 


@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS , useValue:MY_DATE_FORMATS},
    {provide:DateAdapter, useClass:MomentDateAdapter, deps:[MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
