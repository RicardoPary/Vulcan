import {User} from './user';
import {City} from './city';
import {TypeUse} from './type-use';
import {TypeVehicle} from './type-vehicle';
import {PurchaseType} from './purchase-type';

export class Form {
  city = new City();
  email: string;
  id: number = null;
  licensePlate: string;
  nameOrSocialReason: string;
  nitCustomer: string;
  purchaseType = new PurchaseType();
  totalAmount: number;
  typeUse = new TypeUse();
  typeVehicle = new TypeVehicle();
  user = new User();
  year: number;
}
