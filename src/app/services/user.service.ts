import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'users/';
  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string) {
    return this.httpClient.get<ListResponseModel<UserModel>>(
      this.apiUrl + 'getbyemail?email=' + email
    );
  }
  getUserByUserId(userId: number): Observable<SingleResponseModel<UserModel>> {
    return this.httpClient.get<SingleResponseModel<UserModel>>(
      this.apiUrl + 'getbyuserid?userId=' + userId
    );
  }

  update(user: UserModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', user);
  }
  addFindexPoint(userId: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addfindexpoint',
      userId
    );
  }

  getUserClaims(userId: number): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.apiUrl + 'getclaims?userId=' + userId
    );
  }
}
