import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewSoatComponent} from './view-soat.component';
import {ViewSoatRoutingModule} from './view-soat-routing.module';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {TableSoatComponent, FormSoatComponent} from './components/index';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ViewSoatRoutingModule,
    FormsModule
  ],
  declarations: [
    ViewSoatComponent,
    TableSoatComponent,
    FormSoatComponent
  ]
})
export class ViewSoatModule {
}
