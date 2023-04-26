import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:FormGroup

  constructor(private bookingService:BookingService, public matSnack:MatSnackBar, private router: Router) {
    this.login= new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password:new FormControl(null,[Validators.required])
    })
   }

  ngOnInit(): void {
  }

  logins(){
    if (this.login.valid){
      this.bookingService.userLogin().subscribe(
        (res)=>{
          const User= res.find((a)=>{
            return a.userName === this.login.value.userName && a.password === this.login.value.password
          })
          if (User){
            this.router.navigate(['/dashboard'])
            this.login.reset()
            
          }
          else {
            this.matSnack.open("User not Found","close",{
              duration:3000
            })
            this.login.reset()
            this.login.get('userName').clearValidators()
            this.login.get('userName').updateValueAndValidity()
            this.login.get('password').clearValidators()
            this.login.get('password').updateValueAndValidity()
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }

}
