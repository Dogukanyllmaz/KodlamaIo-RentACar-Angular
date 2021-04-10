import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = environment.apiUrl + 'rentals/';
  constructor(private httpClient: HttpClient) {}

  getRental(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(
      this.apiUrl + 'getrentaldetails'
    );
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDto(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentaldetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  checkCarStatus(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
