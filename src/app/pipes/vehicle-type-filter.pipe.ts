import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '../models/vehicleType';

@Pipe({
  name: 'vehicleTypeFilter',
})
export class VehicleTypeFilterPipe implements PipeTransform {
  transform(value: VehicleType[], filterText: string): VehicleType[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (v: VehicleType) =>
            v.typeName.toLocaleLowerCase().indexOf(filterText) === -1
        )
      : value;
  }
}
