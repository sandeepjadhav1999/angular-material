import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, from, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { CustomError } from 'src/app/helpers/customError';
import { city } from 'src/app/model/city';
import { Fruits } from 'src/app/model/fruits';
import { CountriesService } from 'src/app/services/countries.service';
import {ENTER,COMMA} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  countries:any[]=[]
  cities:city[]=[]
  booking:FormGroup
  loadingState:boolean = false
  customError:CustomError = new CustomError()
  minDate = new Date()
  maxDate = new Date("2040-12-31")


  

  constructor( private countryService:CountriesService) { 
    this.booking = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-Za-z. ]*$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null ,[Validators.required]),
      city: new FormControl(null),
      dob: new FormControl(null, [Validators.required]),
      fruit:new FormControl(null)
    })


    this.filteredFruit= this.getFormControl('fruit').valueChanges.pipe(
      startWith(""),
      map((fruit:string | null)=>{
        return fruit ? 
        (()=>{ 
          return this.allFruits.filter(fruitObj=>fruitObj.name.toLowerCase().indexOf(fruit.toLowerCase())==0)
        })() : 
        this.allFruits.slice()
      })
    )
  }

  ngOnInit() {
    

    this.countryService.getCountries().subscribe(
      (res)=>{
        this.countries=res
      },
      (err)=>{
        console.log(err)
      })
    
    this.getFormControl("city").valueChanges
    .pipe(
      debounceTime(500),
      tap(()=>{
        this.cities=[]
        this.loadingState =true
      }),
      switchMap((value) =>
        {
          return this.countryService.getCities(value);
        })
      )
      .subscribe((response) =>
      {
        this.cities = response;
        this.loadingState = false;
      });
      
    
  }
  
  getFormControl(controlName:string):FormControl{
    return this.booking.get(controlName) as FormControl
  }

  getErrorMessage(controlName: string, errorType: string): string
  {
    
    switch (controlName)
    {
      case "name":
        {
          if (errorType === "required")
            return "<strong>Name</strong> field can't be blank";
          else if (errorType === "maxlength")
            return "<strong>Name</strong> can contain up to 30 characters only";
          else if (errorType === "pattern")
            return "<strong>Name</strong> can contain alphabets or dot (.) or space only";
          else
            return "";
        }

      case "email":
        {
          if (errorType === "required")
            return "<strong>Email</strong> can't be blank";
          else if (errorType === "email")
            return "<strong>Email</strong> should be in correct format. Eg: someone@example.com";
          else
            return "";
        }

      case "country":
        {
          if (errorType === "required")
            return "You must choose a <strong>Country</strong>";
          else
            return "";
        }

      case "dob":
        {
          if (errorType === "required")
            return "You must choose a <strong>Date</strong>";
          else
            return "";
        }

      default: return "";
    }
  }

  dateFilter(date:Date|any)
  {
    // console.log(date.getDay())
    return date && date.getDay() !== 0 && date.getDay() !== 6 ;
    
  }


  allFruits: Fruits[] = [
    { name: "Apple" },
    { name: "Apricot" },
    { name: "Banana" },
    { name: "Blueberry" },
    { name: "Grape" },
    { name: "Honeydew" },
    { name: "Kiwi" },
    { name: "Lemon" },
    { name: "Mandarin" },
    { name: "Mango" },
    { name: "Nectarine" },
    { name: "Orange" },
    { name: "Strawberry" },
    { name: "Watermelon" }
  ];

  filteredFruit:Observable<Fruits[]>

  fruits:Fruits[] =[
  ]

  uniqueFruits:Fruits[]=[]
  
  
  
      
            
  @ViewChild("inpClear")inpClear:ElementRef<HTMLInputElement>

  separateKey:number[]=[ENTER, COMMA]


  add(event:any){
    if ((event.value).trim()){
      this.fruits.push({name:event.value.trim()})
      this.booking.patchValue({fruit:null});
      this.inpClear.nativeElement.value=""
    }

    const result = Array.from(this.fruits.reduce((m, t) => m.set(t.name, t), new Map()).values());
    this.uniqueFruits=result

    
  }

  selected(event:any){
    this.fruits.push({name : event.option.viewValue})
    this.booking.patchValue({fruit:null});
    this.inpClear.nativeElement.value=""
    const result = Array.from(this.fruits.reduce((m, t) => m.set(t.name, t), new Map()).values());
    this.uniqueFruits=result

  }

  remove(fruit:Fruits){
    const index = this.uniqueFruits.indexOf(fruit)
    console.log(index)

    if (index >=0){
      this.uniqueFruits.splice(index, 1)
    }

  }




}
