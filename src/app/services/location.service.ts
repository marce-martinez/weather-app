import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

const TOKEN_URL= "https://www.universal-tutorial.com/api/getaccesstoken";
const API_TOKEN= "vJzldSM42GbddxDlZ8cyfZvjz7ULQn_tRumW1IoooKSO5HHtNFzMfRuU5IVUIGoKQbs";
const EMAIL= "diana.martinez.osorio@gmail.com";

const COUNTRIES_URL= "https://www.universal-tutorial.com/api/countries/";
const STATES_URL = "https://www.universal-tutorial.com/api/states/";
const CITIES_URL = "https://www.universal-tutorial.com/api/cities/";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { 
    
  }

  getToken(){
    let headers = new HttpHeaders ();
    headers= headers.set("Accept", "application/json").set("api-token", API_TOKEN).set("user-email", EMAIL);    
    return this.http.get(TOKEN_URL, { headers: headers})
  }

  getCountries(token: string){
    let headers = new HttpHeaders ();    
    headers= headers.set("Authorization", "Bearer "+token).set("Accept", "application/json")
    .set("Access-Control-Allow-Origin", "*");
    return this.http.get(COUNTRIES_URL, { headers: headers})
  }

  getStates(token: string, country: string){
    let headers = new HttpHeaders ();    
    headers= headers.set("Authorization", "Bearer "+token).set("Accept", "application/json")
    .set("Access-Control-Allow-Origin", "*");
    return this.http.get(STATES_URL+country, { headers: headers})
  }

  getCities(token: string, state: string){
    let headers = new HttpHeaders ();    
    headers= headers.set("Authorization", "Bearer "+token).set("Accept", "application/json")
    .set("Access-Control-Allow-Origin", "*");
    return this.http.get(CITIES_URL+state, { headers: headers})
  }

}
