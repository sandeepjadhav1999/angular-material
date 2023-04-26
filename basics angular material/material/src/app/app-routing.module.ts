import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './component/booking-list/booking-list.component';
import { BookingComponent } from './component/booking/booking.component';

const routes: Routes = [
  {path:"booking", component:BookingComponent},
  {path:"booking-list", component:BookingListComponent},
  {path:"", redirectTo:"/booking-list", pathMatch:"full"},
  {path:"**", redirectTo:"/booking-list", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
