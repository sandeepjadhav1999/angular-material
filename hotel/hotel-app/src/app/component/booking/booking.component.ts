import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { Cities } from 'src/app/models/cities';
import { BookingService } from 'src/app/services/booking.service';
import { CustomError } from 'src/app/helpers/customerError';
import { Hotels } from 'src/app/models/hotels';
import { Rooms } from 'src/app/models/rooms';
import { Country } from 'src/app/models/countries';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  cities:any[]=[]
  filteredOptions:any
  hotels:Hotels[]=[]
  roomType:Rooms[]=[]
  Coutries:Country[]=[]
  isCitiesLoading:Boolean = false
  newBooking: FormGroup
  customError:CustomError = new CustomError()
  maxDate=new Date()

  @ViewChild("stepper") stepper: MatStepper;
  allDineIn:any[]=[
    {id:1, dineInName:'Breakfast'},
    {id:2, dineInName:'Lunch'},
    {id:3, dineInName:'Dinner'}
  ]


  minAdults:number=1
  maxAdults:number=4
  minChilder:number=0
  maxChilder:number=2

  today = new Date();

  
  

  constructor(private CitiesService: BookingService) { 
    this.newBooking = new FormGroup({
      searchHotel: new FormGroup({
        cities: new FormControl(null, [Validators.required]),
        checkIn: new FormControl(null, [ Validators.required]),
        checkOut: new FormControl(null,[Validators.required]),
        adults: new FormControl(1,[Validators.min(1)]),
        childern:new FormControl(0,[Validators.min(0)])
      }),
      chooseHotel: new FormGroup({
        hotel: new FormControl(null, [Validators.required])
      }),
      chooseRooms: new FormGroup({
        rooms:new FormControl('Standard Room Type'),
        allDineIn:new FormControl(false),
        dineIn:new FormArray([])
      }),
      personalInformation: new FormGroup({
        customerName:new FormControl(null, [Validators.required, Validators.maxLength(30),Validators.pattern('^[A-Za-z. ]*$')]),
        country:new FormControl(null, [Validators.required]),
        dob:new FormControl(null,[Validators.required]),
        gender:new FormControl(null, [Validators.required])
      }),
      guestInformation: new FormGroup({
        guest1name: new FormControl(null),
        guest1age: new FormControl(null),
        guest1gender: new FormControl(null),
        guest2name: new FormControl(null),
        guest2age: new FormControl(null),
        guest2gender: new FormControl(null),
      }),
      payments: new FormGroup({
        creditCard:new FormControl(null),
        CVV: new FormControl(null),
        giftCard:new FormControl(null),
        code: new FormControl(null),
      })
    })

    this.allDineIn.forEach(() =>
    {
      this.dineInFormArray.push(new FormControl(false));
    });
  }

  ngOnInit(){
    

    this.CitiesService.getCititess().subscribe(response => {
      this.cities = response;
      this.filteredOptions = response;
    })

    this.getFormControl('searchHotel.cities').valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filterData(response);
    }) 

    this.CitiesService.getHotels().subscribe(
      (res)=>{
        this.hotels=res
        console.log(this.hotels)
      },
      (err)=>{
        console.log(err)
      }
    )

    this.CitiesService.getRooms().subscribe(
      (res)=>{
        this.roomType=res
        console.log(this.roomType)
      },
      (err)=>{
        console.log(err)
      }
    )

    this.CitiesService.getCountry().subscribe(
      (res)=>{
        this.Coutries=res
      },
      (err)=>{
        console.log(err)
      }
    )

    
  }
  getFormControl(controlName:string):FormControl{
    return this.newBooking.get(controlName) as FormControl
  }

  

  filterData(enteredData:any){
    this.filteredOptions = this.cities.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  

  getErrorMessage(controlName: string, errorType: string): string
  {
    
    switch (controlName)
    {
      case "cities":
        {
          if (errorType === "required")
            return "you must choose a <strong>City</strong>";
          else
            return "";
        }

      case "checkIn":
        {
          if (errorType === "required")
            return "You must choose a <strong>checkIn Date</strong> ";
          else
            return "";
        }

      case "checkOut":
        {
          if (errorType === "required")
            return "You must choose a <strong>checkOut Date</strong>";
          else
            return "";
        }
      case "customerName":
        {
          if (errorType === "required")
            return "<strong>Name</strong> filed can't be blank"
          else if (errorType === "maxlength")
            return "<strong>Name</strong> can contain up to 30 characters only";
          else if (errorType === "pattern")
            return "<strong>Name</strong> can contain alphabets or dot (.) or space only";
          else
            return "";  
        }

        case "country":
        {
          if (errorType === "required")
            return "you must choose a <strong>Country</strong>";
          else
            return "";
        }

        case "dob":
        {
          if (errorType === "required")
            return "<strong>DOB</strong> field can't be blank";
          else
            return "";
        }
        case "gender":
        {
          if (errorType === "required")
            return "<strong>Gender</strong> field can't be blank";
          else
            return "";
        }

      default: return "";
    }
  }


  increaseAdults(){

    if(this.newBooking.value.searchHotel.adults < this.maxAdults){
      this.getFormControl("searchHotel").patchValue(
        {
          adults:this.newBooking.value.searchHotel.adults +1
        }
      )
    }  
  }

  descreaseAdults(){

    if(this.newBooking.value.searchHotel.adults > this.minAdults){
      this.getFormControl("searchHotel").patchValue(
        {
          adults:this.newBooking.value.searchHotel.adults - 1
        }
      )
    }  
  }

  increaseChilder(){

    if(this.newBooking.value.searchHotel.childern < this.maxChilder){
      this.getFormControl("searchHotel").patchValue(
        {
          childern:this.newBooking.value.searchHotel.childern +1
        }
      )
    }  
  }

  decreaseChilder(){

    if(this.newBooking.value.searchHotel.childern > this.minChilder){
      this.getFormControl("searchHotel").patchValue(
        {
          childern:this.newBooking.value.searchHotel.childern - 1
        }
      )
    }  
  }

  selectedHotel(hotel:Hotels){
    this.getFormControl("chooseHotel").patchValue(
      {
        hotel: hotel.hotelName
      }
    )
  }


  get dineInFormArray(): FormArray
  {
    return this.newBooking.get("chooseRooms.dineIn") as FormArray;
  }

  isAllDineInSelected()
  {
    //if [true, true, true] then return true
    return this.dineInFormArray.value.every((val: boolean) => val == true);
  }

  isNoDineInSelected()
  {
    //if [false, false, false] then return true
    return this.dineInFormArray.value.every((val:boolean) => val == false);
  }

  onAllDineInCheckBoxChange()
  {
    this.allDineIn.forEach((dineIn, index) =>
    {
      this.dineInFormArray.at(index).patchValue(this.getFormControl("chooseRooms.allDineIn").value);
    });
  }

  onDineInChange(index:number)
  {
    if (this.isAllDineInSelected())
    {
      this.getFormControl("chooseRoom").patchValue({ allDineIn: true });
    }
    else
    {
      this.getFormControl("chooseRoom").patchValue({ allDineIn: false });
    }
  }

  asFormControl(control: AbstractControl)
  {
    return control as FormControl;
  }

  finaly(){
    
    console.log(this.newBooking.value)
  }

  

}
