import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  urlPrefix: string = "http://localhost:7000"; 

  constructor(private httpClient:HttpClient) { }

  getBookings():Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(this.urlPrefix + "/bookings")
  }
}
