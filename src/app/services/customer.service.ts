import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = environment.apiUrl + 'customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getalldetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerById(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbyid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  customerUpdate(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }
}
