import { Injectable } from '@angular/core';
import { observable, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Booking } from "../models/booking";
import { HttpClient } from "@angular/common/http";
import { Cities } from '../models/cities';
import { Hotels } from '../models/hotels';
import { Rooms } from '../models/rooms';
import {Country} from '../models/countries'
import { MatDialog, MatDialogConfig , MatDialogRef} from '@angular/material/dialog';
import { ChangeDialogComponent } from '../component/change-dialog/change-dialog.component';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private httpClient: HttpClient, private dialog:MatDialog) { }

  getBookings(): Observable<Booking>
  {
    return this.httpClient.get<Booking[]>(`http://localhost:7000/bookings?_sort=checkIn@_order=desc`).pipe(map(
      (bookings: any) =>
      {
        bookings.forEach((booking: any) =>
        {
          booking.checkIn = new Date(booking.checkIn);
          booking.checkOut = new Date(booking.checkOut);
          booking.dateOfBirth = new Date(booking.dateOfBirth);
        });

        return bookings;
      }
    ));  
  }

  getCitites():Observable<Cities[]>{
    return this.httpClient.get<Cities[]>("http://localhost:7000/cities")
  }

  getCititess():Observable<any[] >{
    return this.httpClient.get<Cities[]>("http://localhost:7000/cities").pipe(
      map((res:any[])=> res.map((item)=> item.cityName))
    )
  }

  getHotels():Observable<Hotels[]>{
    return this.httpClient.get<Hotels[]>("http://localhost:7000/hotels")
  }
  getRooms():Observable<Rooms[]>{
    return this.httpClient.get<Rooms[]>("http://localhost:7000/roomtypes")
  }
  getCountry():Observable<Country[]>{
    return this.httpClient.get<Country[]>("http://localhost:7000/countries")
  }


  getNewBookings(): Observable<Booking[]>{
    return this.httpClient.get<Booking[]>("http://localhost:7000/bookings").pipe(
      map((booking)=>{
        booking.forEach(
          (booking)=>{
            booking.checkIn= new Date(booking.checkIn)
            booking.checkOut = new Date(booking.checkOut);
            booking.dateOfBirth = new Date(booking.dateOfBirth);
          }
        )
        return booking
      })
    )

  } 
  
  openDialogBOx(booking:Booking){
    let dialogConfig= new MatDialogConfig()
    dialogConfig.panelClass="dialog-box"
    dialogConfig.autoFocus=true
    dialogConfig.width='800px'
    dialogConfig.data=booking
    let dailogRef:MatDialogRef<ChangeDialogComponent>=this.dialog.open(ChangeDialogComponent, dialogConfig)
    console.log(dailogRef)
    
  }

  userLogin():Observable<Login[]>{
    return this.httpClient.get<Login[]>("http://localhost:7000/user")
  }
  
}
