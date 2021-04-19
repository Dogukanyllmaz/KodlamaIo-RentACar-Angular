import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindexScore } from '../models/findexScore';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FindexScoreService {
  apiUrl = environment.apiUrl + 'findexScores/';
  constructor(private httpClient: HttpClient) {}

  getFindexScores(): Observable<ListResponseModel<FindexScore>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<FindexScore>>(newPath);
  }

  getFindexScoreByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<FindexScore>> {
    let newPath = this.apiUrl + 'getbycustomerid?customerId=' + customerId;
    return this.httpClient.get<SingleResponseModel<FindexScore>>(newPath);
  }
}
