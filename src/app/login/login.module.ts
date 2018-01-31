import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';

import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
