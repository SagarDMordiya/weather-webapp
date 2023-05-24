import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather.model';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../model/forcast.model';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  error: any; //To store error message
  apiKey: string = "0e8ce3b7590095360a6403647b589e2f"; // API key for OpenWeatherapi
  weather_info: any; // To store weather information
  city: any = ''; // To store city name
  cityInfo: Weather[] = []; // To store city forcasting info

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  // To get weather details for mentioned city
  getWeatherDetails(): void {
    console.log(this.city);
    // To check city value is empty or not
    if (this.city == null || this.city == '') {
      this.error = "Please Enter Valid City Name"
    }
    // Fetching the Data for City
    else {
      const weather_api = `http://api.openweathermap.org/data/2.5/weather?q=` + this.city + `&appid=` + this.apiKey;
      this.httpClient.get<Weather>(weather_api).subscribe(
        (response) => {
          this.clearInfo();
          this.weather_info = response;
          this.error = null;
        },
        (error) => {
          console.log(error.message);
          this.error = 'Error Occured while fetching weather info, Please Check City Name';
        }
      );

    }

  }

  // To get the city forcasting info with maximum of 3 count
  getCityInfo(cityName: String): void {
    const city_api = `https://api.openweathermap.org/data/2.5/forecast?q=` + cityName + `&appid=` + this.apiKey + `&cnt=3`;
    this.httpClient.get<Forecast>(city_api).subscribe((response) => {
      this.cityInfo = response.list;
      console.log(this.cityInfo);
    },
      (error) => {
        console.error(error.message);
        this.error = "Error occured while fetching City info"
      })
  }

  // To Clear the information and input data
  clearInfo(): void {
    this.weather_info = null;
    this.cityInfo = [];
    this.city = null;
  }
}

