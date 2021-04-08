import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colors: Color[] = [];
  colorAddForm: FormGroup;
  colorUpdateForm: FormGroup;
  colorDeleteForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColor();
    this.createColorAddForm();
    this.createColorUpdateForm();
    this.createColorDeleteForm();
  }
  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      colorName: ['', Validators.required],
    });
  }
  createColorDeleteForm() {
    this.colorDeleteForm = this.formBuilder.group({
      colorId: ['', Validators.required],
    });
  }
  colorAdd() {
    if (this.colorAddForm.valid) {
      let model = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(model).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Color is successfully added'
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
  colorUpdate() {
    if (this.colorUpdateForm.valid) {
      let modal = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(modal).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Color is successfully updated'
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
  colorDelete() {
    if (this.colorDeleteForm.valid) {
      let modal = Object.assign({}, this.colorDeleteForm.value);
      this.colorService.deleteColor(modal).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Color is successfully deleted'
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
