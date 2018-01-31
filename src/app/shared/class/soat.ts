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

export class City {
  id: string;
  value: string;
}

export class TypeUse {
  id: string;
  value: string;
}

export class TypeVehicle {
  id: string;
  value: string;
}

export class PurchaseType {
  id: string;
  value: string;
}
