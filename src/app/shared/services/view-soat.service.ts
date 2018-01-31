import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import {LoginService} from './login.service';

@Injectable()
export class ViewSoatService {

  constructor(protected http: Http, private loginService: LoginService) { }

  /*sentFormSoat(form: Form): Observable<any> {
    const url = environment.resource;
    return this.http.post(url + 'soats', {body: form},{headers : this.getHeaders()});
  }*/

  getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    headers.append('Authorization', 'Bearer ' + this.loginService.getTokenGenerated());
    return headers;
  }

  getAllSoats(id: any): Observable<any> {
    const url = environment.resource;
    return this.http.get(url + 'soats?userId.equals=' + id, {headers : this.getHeaders()});
  }
}
