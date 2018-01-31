import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewSoatComponent} from './view-soat.component';

const routes: Routes = [
  {path: '', component: ViewSoatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSoatRoutingModule {
}
