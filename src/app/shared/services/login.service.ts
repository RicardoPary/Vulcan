import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/observable';
import {Login} from '../class/login';

@Injectable()
export class LoginService {

  private token = new BehaviorSubject<any>(null);

  constructor(protected http: Http) {
  }

  authorize(login: Login): Observable<any> {
    const url = environment.resource;
    return this.http.post(url + 'authenticate', login);
  }

  setTokenGenerated(token: string) {
    this.token.next(token);
  }

  getTokenGenerated(): string {
    return this.token.getValue();
  }
}
