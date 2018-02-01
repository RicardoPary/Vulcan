import {City} from './city';
import {TypeUse} from './type-use';
import {TypeVehicle} from './type-vehicle';
import {PurchaseType} from './purchase-type';

export class Soat {
  city: City = new City();
  email: string;
  id: number;
  licensePlate: string;
  nameOrSocialReason: string;
  nitCustomer: string;
  purchaseType: PurchaseType = new PurchaseType();
  totalAmount: number;
  typeUse: TypeUse = new TypeUse();
  typeVehicle: TypeVehicle = new TypeVehicle();
  user: User = new User();
  year: number;
}

export class User {
  activated: boolean;
  email: string;
  firstName: string;
  id: number;
  imageUrl: any;
  langKey: string;
  lastName: string;
  login: string;
  resetDate: string;
}
