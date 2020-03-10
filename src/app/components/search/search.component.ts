import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { State } from 'src/app/models/state';
import { City } from 'src/app/models/city';
import { LocationService } from 'src/app/services/location.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  token: string;

  buttonOptions: any;
  countriesOptions: any;
  statesOptions: any;

  disableState: boolean = false;
  disableCity: boolean = false;

  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];

  constructor(private locationService: LocationService) {
    this.initialData();
  }

  ngOnInit(): void {
  }

  public onFormSubmit($event) {

  }

  initialData() {
    this.getCountries();

    this.buttonOptions = {
      text: "Consultar",
      type: "success",
      useSubmitBehavior: true
    }

    this.countriesOptions = {
      dataSource: this.countries,
      minSearchLength: 2,
      onChange: (e) => {
        this.disableState = false;
        this.getStates(e.event.target.value);
        console.log(e.event.target.value);
      }
    }

    this.statesOptions = { 
      dataSource: this.states, 
      disabled: this.disableState,
      onSelectionChanged: (s) => {
        this.disableCity = false;
        this.getCities(s.selectedItem);
        console.log("cambio estado",s.selectedItem);
      }
     }
    
  }

  getCountries() {
    this.locationService.getToken().subscribe((response: HttpResponse<any[]>) => {
      let token = <any>response["auth_token"];
      this.token = token;
      this.locationService.getCountries(token).subscribe((response: HttpResponse<any[]>) => {
        let country = <any>response;
        country.forEach(c => {
          let nombre = c["country_name"];
          this.countries.push(nombre);
        });
      },
        error => {
          console.log(error);
        }
      );
    }
    );
  }

  getStates(country:string){
    console.log("obteniendo estados", country);
    this.locationService.getStates(this.token, country).subscribe((response: HttpResponse<any[]>) => {
      let state = <any>response;
      console.log(state);
      state.forEach(s => {
        let nombre = s["state_name"];
        this.states.push(nombre);
      });
    },
      error => {
        console.log(error);
      }
    );
  }

  getCities(state:string){
    console.log("obteniendo ciudades", state);
    this.locationService.getCities(this.token, state).subscribe((response: HttpResponse<any[]>) => {
      let city = <any>response;
      console.log(city);
      city.forEach(ci => {
        let nombre = ci["city_name"];
        this.cities.push(nombre);
      });
    },
      error => {
        console.log(error);
      }
    );
  }

}
