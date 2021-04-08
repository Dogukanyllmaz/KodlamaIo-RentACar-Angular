import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  colors: Color[];
  brands: Brand[];
  currentBrand: Brand;
  currentBrandId: number;
  currentColorId: number;
  dataLoaded = false;
  filterText = '';
  constructor(
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getColors();

    this.getBrands();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item cursorPointer active';
    } else {
      return 'list-group-item cursorPointer ';
    }
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
}
