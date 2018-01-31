import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', loadChildren: './components/view-soat/view-soat.module#ViewSoatModule'},
      {path: 'view-soat', loadChildren: './components/view-soat/view-soat.module#ViewSoatModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
