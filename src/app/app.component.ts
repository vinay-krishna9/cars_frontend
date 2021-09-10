import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarsService } from './services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cars: any;
  yearOptions:Object;
  fuelOptions: Object;
  sellertypeOptions: Object;
  filterData: FormGroup;
  searchTerm: any;
  hideyear: boolean = true;
  hideKM: boolean = true
  hideTransmission: boolean = true
  hideOwner: boolean = true
  isloaded: boolean;

  constructor(private _cars: CarsService, private fb:FormBuilder) {
    this.filterData = this.fb.group({
      year: "",
      fuel: "",
      seller_type: ""
    })
   }

  ngOnInit() {
    this.getCars()
    this.getfilterOptions()
  }

  getCars() {
    this.isloaded = false;
    this._cars.getCars().subscribe(response => {
      this.cars = response
      this.isloaded = true;
    })
  }

  getfilterOptions() {
    this._cars.getYearFilterOptions().subscribe(response => {
       this.yearOptions = Object.values(response).map(x => {return Number(x.year)}).sort((x,y) => x - y)
      
    })
    this._cars.getFuelFilterOptions().subscribe(response => {
      this.fuelOptions = response
    })
    this._cars.getSellertypeFilterOptions().subscribe(response => {
      this.sellertypeOptions = response
    })
  }

  filter(){
    this.cars = []
    this.isloaded = false;
    this._cars.filterYearFuelSellertype(this.filterData.value).subscribe(response => {
      this.isloaded = true
          this.cars = response["result"]
          this.searchManufacturer()
    })
    
  }

  searchManufacturer() {
    // this._cars.searchManufacturers({"search": this.searchTerm}).subscribe(response => {
    //   this.cars = response['result']
    // })    
    this.cars = this.cars.filter(car => {
      return car.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
    
  }

  unhideall(){
    this.hideKM = this.hideOwner = this.hideTransmission = true
  }
}
