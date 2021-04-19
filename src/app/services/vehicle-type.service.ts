import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { VehicleType } from '../models/vehicleType';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  apiUrl = environment.apiUrl + 'vehicleTypes/';
  constructor(private httpClient: HttpClient) {}

  getVehicleTypes(): Observable<ListResponseModel<VehicleType>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<VehicleType>>(newPath);
  }

  getBrandById(
    vehicleTypeId: number
  ): Observable<ListResponseModel<VehicleType>> {
    let newPath = this.apiUrl + 'getbyid?id=' + vehicleTypeId;
    return this.httpClient.get<ListResponseModel<VehicleType>>(newPath);
  }

  addVehicleType(vehicleTypeId: VehicleType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      vehicleTypeId
    );
  }

  updateVehicleType(vehicleTypeId: VehicleType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'update',
      vehicleTypeId
    );
  }

  deleteVehicleType(vehicleType: VehicleType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'delete',
      vehicleType
    );
  }
}
