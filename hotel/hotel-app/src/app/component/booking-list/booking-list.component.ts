import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';




@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort:MatSort

  bookings: MatTableDataSource<Booking>=null
  columnsToDisplay=['customerName','checkIn','status','roomType','phone','action']
  bookingLoadingStatus='Loading....'
  isLOading:boolean=false
  isError:boolean=false
  rowselect:Booking[]=[]

  constructor(private CitiesService: BookingService,){
    
  }
  ngOnInit(): void {
    this.isLOading=true
    this.CitiesService.getNewBookings().subscribe(
      (res)=>{
        console.log(res)
        this.bookings=new MatTableDataSource<Booking>(res)
        this.isLOading=false
        this.bookings.paginator=this.paginator
        this.bookings.sort=this.sort
        this.rowselect=res
    
      },
      (err)=>{
        this.isError=true
        this.bookingLoadingStatus="Error While Fetching the Data"
      }
    )
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookings.filter = filterValue.trim().toLowerCase();
  }


  onviewChange(booking:Booking){
    this.CitiesService.openDialogBOx(booking)
  }
  

}
