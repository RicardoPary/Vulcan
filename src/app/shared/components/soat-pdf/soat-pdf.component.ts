import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';

import {FormSoatService} from '../../services/form-soat.service';

export interface ConfirmModel {
  soat: any;
}

@Component({
  selector: 'app-soat-pdf',
  templateUrl: './soat-pdf.component.html',
  styleUrls: ['./soat-pdf.component.scss']
})
export class SoatPdfComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  soat: any;
  pdfSrc: any;

  constructor(dialogService: DialogService,
              private formSoatService: FormSoatService) {
    super(dialogService);


  }

  ngOnInit() {
    this.formSoatService.getVoucherSoat(this.soat.id).subscribe(
      response => {
        //const file1 = new ArrayBuffer(response._body)
        const file = new Blob([response._body], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        this.pdfSrc = fileURL;
        //this.pdfSrc = 'data:application/octet-stream;base64,' + file1 +'.pdf';

      }
    );
  }


  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }

}
