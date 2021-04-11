import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerDetail } from 'src/app/models/customerDetail';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css'],
})
export class RentalCarComponent implements OnInit {
  rentals: Rental[] = [];
  customers: Customer[];
  id: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;

  constructor(
    private rentalService: RentalService,
    private authService: AuthService,
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  @Input() car: Car;

  ngOnInit(): void {
    this.getCustomer();
  }

  isLogOK() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.toastr.error('Must be Login or Register');
      this.router.navigate(['/home']);
      return false;
    }
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10);
  }

  create() {
    let rental: Rental = {
      carId: this.car.id,
      customerId: parseInt(this.id.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.rentalService.add(rental).subscribe(
      (repsonse) => {
        this.toastr.info('Navigate to  Payment Page');
        this.toastr.success('RENT OK');
        this.router.navigate(['/payment', JSON.stringify(rental)]);
      },
      (error) => {
        console.info(error);
        this.toastr.error(error.error);
        this.toastr.error(error.error.Message);
      }
    );
  }
}
