import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewSoatComponent} from './view-soat.component';
import {ViewSoatRoutingModule} from './view-soat-routing.module';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {BusyModule} from 'angular2-busy';



import {TableSoatComponent, FormSoatComponent, FilterColumnComponent} from './components/index';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ViewSoatRoutingModule,
    FormsModule,
    BusyModule
  ],
  declarations: [
    ViewSoatComponent,
    TableSoatComponent,
    FormSoatComponent,
    FilterColumnComponent
  ]
})
export class ViewSoatModule {
}
