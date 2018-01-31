import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoginService} from './login.service';
import {FilterSoat} from '../class/filter-soat';

@Injectable()
export class ViewSoatService {

  private filterSoats = new BehaviorSubject<any>(new FilterSoat);

  constructor(protected http: Http, private loginService: LoginService) {
  }

  /*sentFormSoat(form: Form): Observable<any> {
    const url = environment.resource;
    return this.http.post(url + 'soats', {body: form},{headers : this.getHeaders()});
  }*/

  sendFilterSoats(object: any) {
    this.filterSoats.next(object);
  }
  currentFilterSoats(): Observable<any> {
    return this.filterSoats.asObservable();
  }
  getFilterSoats(): any {
    return this.filterSoats.getValue();
  }

  getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    headers.append('Authorization', 'Bearer ' + this.loginService.getTokenGenerated());
    return headers;
  }

  getAllSoats(filterSoat: FilterSoat): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'soats?userId.equals=' + filterSoat.userId +
                        '&licensePlate.contains=' + filterSoat.licensePlate +
                        '&page=' + filterSoat.page +
                        '&size=' + filterSoat.size, {headers: this.getHeaders()});
  }

  getAll(id: any): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'soats?userId.equals=' + id, {headers: this.getHeaders()});
  }
}
