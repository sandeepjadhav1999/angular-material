import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/services/booking.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @ViewChild(MatPaginator)paginator:MatPaginator
  @ViewChild(MatSort)sort:MatSort

  booking:MatTableDataSource<Booking>;
  displayedColumns:string[]=['customerName','location','date','action']
  bookingSearch: FormGroup
  
  constructor(private bookingService:BookingService) {
    this.bookingSearch = new FormGroup({
      search: new FormControl(null)
    })   
   }

  ngOnInit():void{

    this.bookingService.getBookings().subscribe(
      (res:Booking[])=>{
        this.booking= new MatTableDataSource<Booking>(res)
        this.booking.paginator=this.paginator
        this.booking.sort=this.sort
      },
      (err)=>{
        console.log(err)
      }
    )
  
  }

  searchFilter(){
    if(this.bookingSearch.value.search != null && this.booking){
      this.booking.filter =this.bookingSearch.value.search.trim()
    }
  }

  close(){
    this.bookingSearch.patchValue({search : ""})
    this.searchFilter()
  }
 
}
