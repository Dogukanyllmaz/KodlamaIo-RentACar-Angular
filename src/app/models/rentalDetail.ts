export interface RentalDetail {
  id: number;
  carId: number;

  carName: number;
  brandName: string;
  userName: string;
  modelYear: number;
  companyName: string;
  description: string;
  rentDate: Date;
  returnDate: Date;
  dailyPrice: number;
}
