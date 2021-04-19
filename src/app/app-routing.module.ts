import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalCarComponent } from './components/rental-car/rental-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/vehicleType/:vehicleTypeId', component: CarComponent },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [LoginGuard],
  },
  { path: 'rentals', component: RentalComponent, canActivate: [LoginGuard] },
  {
    path: 'payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'brandadd', component: BrandAddComponent, canActivate: [LoginGuard] },
  { path: 'coloradd', component: ColorAddComponent, canActivate: [LoginGuard] },
  { path: 'caradd', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'cars/rent', component: PaymentComponent, canActivate: [LoginGuard] },
  { path: 'rentCar', component: RentalCarComponent, canActivate: [LoginGuard] },
  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
