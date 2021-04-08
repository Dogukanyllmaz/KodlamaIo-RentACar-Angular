import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Findex } from '../models/findex';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class FindexService {
  apiUrl = environment.apiUrl + 'findex';
  constructor(private httpClient: HttpClient) {}

  add(findex: Findex): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, findex);
  }

  delete(findex: Findex): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, findex);
  }

  update(findex: Findex): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, findex);
  }

  getFindexScoreByUserId(
    userId: number
  ): Observable<ListResponseModel<Findex>> {
    let newPath = this.apiUrl + 'getbyuserid?userId=' + userId;
    return this.httpClient.get<ListResponseModel<Findex>>(newPath);
  }
}
