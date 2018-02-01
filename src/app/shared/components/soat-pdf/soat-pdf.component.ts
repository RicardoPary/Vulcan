import {Component, OnInit, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {FormSoatService, ConfirmModel} from '../../index';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-soat-pdf',
  templateUrl: './soat-pdf.component.html',
  styleUrls: ['./soat-pdf.component.scss']
})
export class SoatPdfComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, OnDestroy {

  soat: any;
  pdfSrc: any;
  subscriptionFormSoatService: Subscription;

  constructor(dialogService: DialogService,
              private formSoatService: FormSoatService) {
    super(dialogService);
  }

  ngOnInit() {
    this.subscriptionFormSoatService = this.formSoatService.getVoucherSoat(this.soat.id).subscribe(
      response => {
        const file = new Blob([response._body], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        this.pdfSrc = fileURL;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionFormSoatService.unsubscribe();
  }
}
