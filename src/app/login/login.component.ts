import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from '../shared/index';
import {Login} from '../shared/class/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(public router: Router,
              public loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.login.username = form.value.user;
    this.login.password = form.value.password;
    this.login.rememberMe = true;

    this.loginService.authorize(this.login).subscribe(
      response => {
        if (response.status === 200) {
          this.loginService.setTokenGenerated(response.json().id_token);
          this.router.navigate(['/layout']);
        }
      }
    );
  }
}
