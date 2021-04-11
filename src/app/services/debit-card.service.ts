import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'primeng/card';
import { Observable } from 'rxjs';
import { DebitCard } from 'src/app/models/debitCard';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class DebitCardService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getCardByCardNumber(
    cardNumber: string
  ): Observable<SingleResponseModel<DebitCard>> {
    return this.httpClient.get<SingleResponseModel<DebitCard>>(
      environment.apiUrl + 'debitCards/getbycardnumber?cardNumber=' + cardNumber
    );
  }
  pay(
    cardNumber: string,
    rental: Rental,
    amount: Number
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'debitcards/addrental',
      {
        cardNumber: cardNumber,
        rental: rental,
        amount: amount,
      }
    );
  }

  add(card: DebitCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'debitCards/add',
      card
    );
  }

  getByCustomerId(id: number): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(
      this.apiUrl + 'creditcards/getbycustomer?id=' + id
    );
  }

  update(card: DebitCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'creditcards/update',
      card
    );
  }

  delete(card: DebitCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'creditcards/delete',
      card
    );
  }
}
