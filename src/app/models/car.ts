import { CarImage } from './carImage';

export interface Car {
  id: number;
  name: string;
  colorId: number;
  brandId: number;
  colorName: string;
  brandName: string;
  imagePath: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  status: boolean;
  carImages: CarImage[];
  carFindexPoint: number;
  typeId: number;
}
