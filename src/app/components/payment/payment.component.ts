import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { DebitCardService } from 'src/app/services/debit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isChecked: boolean = false;
  paymentForm: FormGroup;
  rental: Rental;
  carDetail: Car;
  amountOfPayment: number;
  savedCards: Card[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private debitCardService: DebitCardService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // this.getSaveCardByUserId();
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.createPaymentForm();
        this.getCarDetail();
        this.paymentCalculator();
      }
    });
  }

  getCarDetail() {
    this.carService.getCarDetails(this.rental.carId).subscribe((response) => {
      this.carDetail = response.data;
      this.paymentCalculator();
    });
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      savedCards: [''],
      cardholderName: [this.localStorageService.get('firstName')],
      cardholderLastName: [this.localStorageService.get('lastName')],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  pay() {
    if (this.paymentForm.valid) {
      this.debitCardService
        .pay(
          this.paymentForm.value.cardNumber,
          this.rental,
          this.amountOfPayment + (this.amountOfPayment * 18) / 100
        )
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.addFindexPoint();
            this.SaveCard();
            this.router.navigate(['/cars']);
          },
          (responseError) => {
            this.toastrService.error(
              responseError.error.message,
              'Ödeme Başarısız'
            );
          }
        );
    } else {
      this.toastrService.error('Bilgileri Kontrol Ediniz', 'Dikkat');
    }
  }
  addFindexPoint() {
    this.userService
      .addFindexPoint(Number(this.localStorageService.get('userId')))
      .subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.info(responseError.error.message);
        }
      );
  }

  // getSaveCardByUserId() {
  //   this.paymentService
  //     .getCardByUserId(Number(this.localStorageService.get('userId')))
  //     .subscribe((response) => {
  //       this.savedCards = response.data;
  //     });
  // }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetail.dailyPrice;
    }
  }

  SaveCard() {
    if (this.isChecked == true) {
      let cardModel = Object.assign(
        { userId: Number(this.localStorageService.get('userId')) },
        this.paymentForm.value
      );
      console.log(cardModel);
      this.paymentService.saveCard(cardModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Kart Kaydedilemedi'
          );
        }
      );
    }
  }
  setCardClass() {
    if (this.savedCards.length > 0) {
      return 'col-md-7';
    } else {
      return 'col-md-12';
    }
  }

  payWithSavedCard(card: Card) {
    this.debitCardService
      .pay(
        card.cardNumber,
        this.rental,
        this.amountOfPayment + (this.amountOfPayment * 18) / 100
      )
      .subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.addFindexPoint();
          this.SaveCard();
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Ödeme Başarısız'
          );
        }
      );
  }
}
