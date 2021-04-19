import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NavCarFilterPipe } from './pipes/nav-car-filter.pipe';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterComponent } from './components/car/filter/filter.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrandComponent } from './components/brand/brand.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorComponent } from './components/color/color.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerNullComponent } from './components/customer-null/customer-null.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RentalCarComponent } from './components/rental-car/rental-car.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehicleTypeComponent } from './components/vehicle-type/vehicle-type.component';
import { VehicleTypeFilterPipe } from './pipes/vehicle-type-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CategoryComponent,
    CarComponent,
    CarDetailComponent,
    NavCarFilterPipe,
    RentalComponent,
    CustomerComponent,
    PaymentComponent,
    FilterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    BrandComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    ColorComponent,
    UserDetailComponent,
    CustomerDetailComponent,
    CustomerNullComponent,
    ChangePasswordComponent,
    RentalCarComponent,
    VatAddedPipe,
    CustomerAddComponent,
    AboutComponent,
    FooterComponent,
    VehicleTypeComponent,
    VehicleTypeFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    JwtModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
