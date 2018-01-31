import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {Form} from '../class/form';

import {LoginService} from './login.service';

@Injectable()
export class FormSoatService {

  constructor(protected http: Http, private loginService: LoginService) {
  }

  sentFormSoat(form: Form): Observable<any> {
    const url = environment.resource;
    return this.http.post(url + 'soats', form, {headers : this.getHeaders()});
  }

  getCities(): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'sorters/cities', {headers : this.getHeaders()});
  }

  getPurchaseTypes(): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'sorters/purchase-types', {headers : this.getHeaders()});
  }

  getTypesUses(): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'sorters/types-uses', {headers : this.getHeaders()});
  }

  getTypesVehicles(): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'sorters/types-vehicles', {headers : this.getHeaders()});
  }

  getVoucherSoat(id: any): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'soats/' + id + '/vouchers', {headers : this.getHeaders()});
  }

  getAccount(): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'account', {headers : this.getHeaders()});
  }

  getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    headers.append('Authorization', 'Bearer ' + this.loginService.getTokenGenerated());
    return headers;
  }

}
