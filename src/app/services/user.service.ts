import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'user/';
  constructor(private httpClient: HttpClient) {}

  getByEmail(email: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.apiUrl + 'email?email=' + email);
  }
  profileUpdate(user: UserModel): Observable<ResponseModel> {
    console.log(user);
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', {
      user: {
        userId: user.id,
        userName: user.firstName + ' ' + user.lastName,
        email: user.email,
      },
      password: user.password,
    });
  }
}
