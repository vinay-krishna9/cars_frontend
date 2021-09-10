import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  public getCars() {
    let url = AppSettings.BASE_URL + AppSettings.GET_CARS
    return this.http.get(url)
  }

  public getYearFilterOptions() {
    let url = AppSettings.BASE_URL + AppSettings.GET_YEAR_OPTIONS
    return this.http.get(url)
  }

  public getFuelFilterOptions() {
    let url = AppSettings.BASE_URL + AppSettings.GET_FUEL_OPTIONS
    return this.http.get(url)
  }

  public getSellertypeFilterOptions() {
    let url = AppSettings.BASE_URL + AppSettings.GET_SELLERTYPE_OPTIONS
    return this.http.get(url)
  }

  public searchManufacturers(data) {
    let url = AppSettings.BASE_URL + AppSettings.SEARCH_MANUFACTURES
    return this.http.post(url, data)
  }

  public filterYearFuelSellertype(data) {
    let url = AppSettings.BASE_URL + AppSettings.FILTER_FUEL_YEAR_SELLERTYPE
    return this.http.post(url, data)
  }
}
