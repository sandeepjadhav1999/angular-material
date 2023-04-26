import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { city } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  urlPrefix: string = "http://localhost:7000"; 


  constructor(private httpClient:HttpClient) { }

  getCountries():Observable<any>{
    return this.httpClient.get<any>(this.urlPrefix + "/countries")
  }

  getCities(search:string):Observable<city[]>{
    return this.httpClient.get<city[]>(`http://localhost:7000/cities?cityName_like=^${search}`)
  }
}
