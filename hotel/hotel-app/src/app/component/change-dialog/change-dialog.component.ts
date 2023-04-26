import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-change-dialog',
  templateUrl: './change-dialog.component.html',
  styleUrls: ['./change-dialog.component.css']
})
export class ChangeDialogComponent implements OnInit {

  ChangeDate:FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public matData:Booking , public matDaiRef:MatDialogRef<ChangeDialogComponent>) { 
    this.ChangeDate= new FormGroup({
      checkIn: new FormControl(null),
      checkOut: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.ChangeDate.patchValue({
      checkIn:this.matData.checkIn,
      checkOut:this.matData.checkOut
    })
  }

  onCLickClose(){
    this.matDaiRef.close()
  }

}
