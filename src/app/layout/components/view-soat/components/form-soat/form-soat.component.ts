import {Component, OnInit} from '@angular/core';
import {FormSoatService} from '../../../../../shared/services/form-soat.service';
import {Form} from '../../../../../shared/class/form';

@Component({
  selector: 'app-form-soat',
  templateUrl: './form-soat.component.html',
  styleUrls: ['./form-soat.component.scss']
})
export class FormSoatComponent implements OnInit {

  cities: any[] = [];
  purchaseTypes: any[] = [];
  typesUSes: any[] = [];
  typesVehicles: any[] = [];
  form: Form = new Form();

  constructor(private formSoatService: FormSoatService) {

    this.formSoatService.getCities().subscribe(
      response => this.cities = response.json()
    );

    this.formSoatService.getPurchaseTypes().subscribe(
      response => this.purchaseTypes = response.json()
    );

    this.formSoatService.getTypesUses().subscribe(
      response => this.typesUSes = response.json()
    );

    this.formSoatService.getTypesVehicles().subscribe(
      response => this.typesVehicles = response.json()
    );

    this.formSoatService.getAccount().subscribe(
      response => {
        this.form.user = response.json();
      }
    );
  }

  ngOnInit() {

  }

  onSubmit(form) {

    this.cities.map(citi => {
      if (citi.id === form.value.cities) {
        this.form.city = citi;
      }
    });

    this.typesUSes.map(citi => {
      if (citi.id === form.value.typesuses) {
        this.form.typeUse = citi;
      }
    });

    this.typesVehicles.map(citi => {
      if (citi.id === form.value.typesvehicles) {
        this.form.typeVehicle = citi;
      }
    });

    this.purchaseTypes.map(citi => {
      if (citi.id === form.value.typespurchase) {
        this.form.purchaseType = citi;
      }
    });

    this.form.email = form.value.email;
    this.form.year = form.value.gestion;
    this.form.nitCustomer = form.value.nit;
    this.form.totalAmount = form.value.montototal;
    this.form.licensePlate = form.value.placa;
    this.form.nameOrSocialReason = form.value.razonsocial;

    this.formSoatService.sentFormSoat(this.form).subscribe(
      response => {
        if (response.status === 201) {

        }
      }
    );
  }

  verifyValidTouched(value) {
    return !value.valid;
  }

  applyCssError(value) {
    return {
      'has-error': this.verifyValidTouched(value),
      'has-feedback': this.verifyValidTouched(value)
    };
  }
}
