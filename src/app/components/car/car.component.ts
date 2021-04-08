import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  brands: Brand[];
  color: Color[];
  filterText = '';
  dataLoaded = false;
  currentCar: Car;
  imageUrl = environment.baseUrl;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getFilteredCars(params['brandId'], params['colorId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarClass(car: Car) {
    if ((car = this.currentCar)) {
      return 'table-info cursorPointer';
    } else {
      return 'cursorPointer';
    }
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getFilteredCars(brandId: number, colorId: number) {
    this.carService.getFilteredCars(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      if (this.cars.length == 0) {
        this.toastrService.info(
          'There is no vehicle in the criteria you are looking for',
          response.message
        );
      }
    });
  }
}
