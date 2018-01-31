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

export class User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: any;
}
