import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  brandUpdateForm: FormGroup;
  brandDeleteForm: FormGroup;
  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
    this.createBrandUpdateForm();
    this.createBrandDeleteForm();
    this.getBrand();
  }
  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  createBrandDeleteForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: ['', Validators.required],
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      brandName: ['', Validators.required],
    });
  }
  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Brand is successfully added'
          );
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error'
              );
            }
          }
        }
      );
    }
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let modal = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(modal).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Brand is successfully updated'
          );
          setTimeout(() => {
            this.router.navigate(['brandadd']);
          }, 3000);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error'
              );
            }
          }
        }
      );
    }
  }
  delete() {
    if (this.brandDeleteForm.valid) {
      let modal = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.deleteBrand(modal).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Brand is successfully deleted'
          );
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error'
              );
            }
          }
        }
      );
    }
  }
}
