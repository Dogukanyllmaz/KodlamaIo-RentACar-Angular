import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [LoginGuard],
  },
  { path: 'rentals', component: RentalComponent },
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
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
