import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './component/booking-list/booking-list.component';
import { BookingComponent } from './component/booking/booking.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'booking', component:BookingComponent},
  {path:'login', component:LoginComponent},
  {path:'booking-list' , component:BookingListComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
