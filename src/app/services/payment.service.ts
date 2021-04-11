import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'primeng/card';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  saveCard(card: Card): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'saveCard/add',
      card
    );
  }

  getCardByUserId(userId: number): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(
      this.apiUrl + 'saveCard/getbyuserid?userId=' + userId
    );
  }
  getCardByCardNumber(
    cardNumber: string
  ): Observable<SingleResponseModel<Card>> {
    return this.httpClient.get<SingleResponseModel<Card>>(
      this.apiUrl + 'saveCard/getbycardnumber?cardNumber=' + cardNumber
    );
  }

  checkCardExist(cardNumber: string): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(
      this.apiUrl + 'saveCard/getbycardnumber?cardNumber=' + cardNumber
    );
  }

  payment(payment: Payment): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'rentals/payment';
    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
