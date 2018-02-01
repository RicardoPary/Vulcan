import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FilterSoat} from '../../../../../shared/class/filter-soat';

import {ViewSoatService} from '../../../../../shared/services/view-soat.service';

@Component({
  selector: 'app-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent implements OnInit {

  date = new Date();
  aux: any;
  @Input() queueType: string;
  listPerPage: number;
  listTotalList: number;
  listPage: number;
  accountListServiceSubscription: Subscription = new Subscription();

  @Input() filterDisplayName: string;
  @Input() filterName: string;
  @Input() dataType: string;

  @Output() clickCloseFilter = new EventEmitter<any>();

  auxStatusBeginDateFrom: string;
  auxStatusBeginDateTo: string;
  auxStatusBeginDateFromMin: any;

  filtersColumnAccounts: FilterSoat = new FilterSoat();

  smartFilterAccountNumber = '';
  smartFilterLegalName = '';
  smartFilterNPI = '';

  statusSmartFilterAccountNumber = false;
  statusSmartFilterLegalName = false;
  statusSmartFilterNPI = false;

  arrayAccountNumber: string[] = [];
  arrayLegalName: string[] = [];
  arrayNPI: string[] = [];

  constructor(private viewSoatService: ViewSoatService) {
  }

  ngOnInit() {
    if (this.queueType === 'active') {
      this.filtersColumnAccounts = this.viewSoatService.getFilterSoats();
    }
  }

  closeFilter() {
    this.clickCloseFilter.emit();
  }

  onSubmitFilterColumnAccounts(form) {

    if (form.value.licensePlate) {
      this.filtersColumnAccounts.licensePlate = form.value.licensePlate.trim();
    } else {
      this.filtersColumnAccounts.licensePlate = '';
    }

    this.filtersColumnAccounts.page = 0;
    this.viewSoatService.sendFilterSoats(this.filtersColumnAccounts);
  }

  applyCssError(value) {
    return {
      'has-error': this.verifyValidTouched(value),
      'has-feedback': this.verifyValidTouched(value)
    };
  }

  onFocusAccountNumber() {
    this.statusSmartFilterAccountNumber = true;
  }

  verifyValidTouched(value) {
    return !value.valid;
  }
}








