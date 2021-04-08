import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = environment.apiUrl + 'cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcarsdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcardetailbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarDetail(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcardetailbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getbrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newUrl = this.apiUrl + 'getbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newUrl);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'getcolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getFilteredCars(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl +
      'getcarsbybrandandcolor?brandid=' +
      brandId +
      '&colorid=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  addCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  deleteCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
