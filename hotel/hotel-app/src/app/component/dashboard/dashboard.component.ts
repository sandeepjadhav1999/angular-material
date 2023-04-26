import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { Chart } from 'angular-highcharts';
import { columnChartOptions } from 'src/app/charts/column-chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  girdCol:number = 4
  lgGrid:number =2
  bookings: Booking[] = [];
  chartColumn:Chart = new Chart(columnChartOptions)
  progressSpinner:boolean = false

  constructor(private mediaObserver:MediaObserver, private bookingsService:BookingService) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>
    {
      
      if (media.some(mediaChange => mediaChange.mqAlias == "lt-sm"))
      {
        this.girdCol = 1;
        this.lgGrid = 1;
      }
      else if (media.some(mediaChange => mediaChange.mqAlias == "lt-md"))
      {
        this.girdCol = 2;
        this.lgGrid = 2;
      }
      else
      {
        this.girdCol = 4;
        this.lgGrid = 2;
      }
    });

    this.progressSpinner=true
    this.bookingsService.getBookings().subscribe(
      (response: any) =>
      {
        console.log(response)
        this.bookings = response;
        this.progressSpinner=false
      },
      (error) =>
      {
        console.log(error);
        this.progressSpinner=true
      }
    );
    
  }

}
