import { Component, OnInit } from '@angular/core';
import { VehicleType } from 'src/app/models/vehicleType';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css'],
})
export class VehicleTypeComponent implements OnInit {
  vehicleTypes: VehicleType[];
  currentVehicleType: VehicleType;
  filterText = '';
  dataLoaded = false;
  constructor(private vehicleTypeService: VehicleTypeService) {}

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe((response) => {
      this.vehicleTypes = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentVehicleType(vehicleType: VehicleType) {
    this.currentVehicleType = vehicleType;
  }

  getCurrentVehicleTypeClass(vehicleType: VehicleType) {
    if (vehicleType == this.currentVehicleType) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllVehicleTypeClass() {
    if (!this.currentVehicleType) {
      return 'list-group-item list-group-item-info';
    } else {
      return 'list-group-item';
    }
  }
}
