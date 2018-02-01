import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../shared/index';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  logOut() {
    this.loginService.setTokenGenerated(null);
    this.router.navigate(['/login']);
  }
}
