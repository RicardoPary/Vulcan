import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SoatPdfComponent} from './shared/components/soat-pdf/soat-pdf.component';
import {HttpModule} from '@angular/http';

import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {
  FormSoatService,
  LoginService,
  ViewSoatService,
  PagerService
} from './shared/index';

import {AuthGuard} from './shared/guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    SoatPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    PdfViewerModule,
    AngularFontAwesomeModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  entryComponents: [
    SoatPdfComponent
  ],
  providers: [
    FormSoatService,
    LoginService,
    ViewSoatService,
    PagerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
