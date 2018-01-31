import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/guard/auth.guard';

const routes: Routes = [
  {path: 'layout', loadChildren: './layout/layout.module#LayoutModule',
    canActivate: [AuthGuard]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}






