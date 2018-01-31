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
  providerTypes: any[] = [];
  accountTypes: any[] = [];
  enrollmentStatus: any[] = [];
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

   /* if (
      this.filterName === 'AccountTypeDescriptor' ||
      this.filterName === 'ProviderType' ||
      this.filterName === 'StatusAcc'
    ) {
      this.accountListServiceSubscription = this.accountListService.getApplicationProviderPracticeAccounts().subscribe(
        (response) => {
          this.providerTypes = response.json().data.ProviderType;
          this.enrollmentStatus = response.json().data.enrollmentStatus;
          this.accountTypes = response.json().data.accountType;
        }
      );
    }

    if (this.filterName === 'AccountNumber') {
      this.getDatesSmartText('KYPEnrollment', 'pADM_Account', 'AccountNumber', 'string', this.arrayAccountNumber);
    }
    if (this.filterName === 'LegalName') {
      this.getDatesSmartText('KYPEnrollment', 'pADM_Account', 'LegalName', 'string', this.arrayLegalName);
    }
    if (this.filterName === 'NPI') {
      this.getDatesSmartText('KYPEnrollment', 'pADM_Account', 'NPI', 'string', this.arrayNPI);
    }

    if (this.queueType === 'active') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsActive();
    }
    if (this.queueType === 'all') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsAll();
    }
    if (this.queueType === 'inactive') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsInactive();
    }
    if (this.queueType === 'pending') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsPending();
    }
    if (this.queueType === 'suspended') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsSuspended();
    }
    if (this.queueType === 'temp-suspended') {
      this.filtersColumnAccounts = this.accountListService.getFilterAccountsTempSuspended();
    }


    if (this.filtersColumnAccounts.advancedSearchDTO.accountNumber) {
      this.smartFilterAccountNumber = this.filtersColumnAccounts.advancedSearchDTO.accountNumber;
    }

    if (this.filtersColumnAccounts.advancedSearchDTO.legalName) {
      this.smartFilterLegalName = this.filtersColumnAccounts.advancedSearchDTO.legalName;
    }

    if (this.filtersColumnAccounts.advancedSearchDTO.npi) {
      this.smartFilterNPI = this.filtersColumnAccounts.advancedSearchDTO.npi;
    }

    if (this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom ||
      this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo) {
      if (this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom) {
        this.auxStatusBeginDateFrom = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom;
        this.auxStatusBeginDateFromMin = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom;
      }
      if (this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo) {
        this.auxStatusBeginDateTo = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo;
      }
    }*/
  }

  getValuesSmartText(array: any, filter: any) {

    return array.filter(v => {
      if (
        (v.substr(0, 3).toLowerCase()) === (filter.substr(0, 3).toLowerCase()) &&
        (v.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      ) {
        return true;
      }
      return false;
    });
  }

  selectAccountNumber(event) {
    this.smartFilterAccountNumber = event;
    this.statusSmartFilterAccountNumber = !this.statusSmartFilterAccountNumber;
  }

  selectLegalName(value) {
    this.smartFilterLegalName = value;
    this.statusSmartFilterLegalName = !this.statusSmartFilterLegalName;
  }

  selectNPI(value) {
    this.smartFilterNPI = value;
    this.statusSmartFilterNPI = !this.statusSmartFilterNPI;
  }


  getDate(date) {
    if (date && date.length > 10) {
      return date.substring(5, 7) + '-' + date.substring(8, 10) + '-' + date.substring(0, 4);
    } else {
      return date;
    }
  }

  closeFilter() {
    this.clickCloseFilter.emit();
  }

  changeStatusBeginDateFrom(value) {
    if (value) {
      if (value.length) {
        this.auxStatusBeginDateFrom = this.auxStatusBeginDateFrom.trim();
      } else {
        this.auxStatusBeginDateFromMin = new Date(Date.parse(value));
      }
      if (value.length === 10) {
        if ((new Date(Date.parse(value)) > this.date)) {
          this.auxStatusBeginDateFrom = '';
        } else {
          this.auxStatusBeginDateFromMin = new Date(Date.parse(value));
        }
      }
      if (value.length > 10) {
        this.auxStatusBeginDateFrom = '';
      }
    } else {
      this.auxStatusBeginDateFromMin = null;
    }

    if (this.auxStatusBeginDateTo !== null || this.auxStatusBeginDateTo !== '') {
      if ((new Date(Date.parse(value))) > (new Date(Date.parse(this.auxStatusBeginDateTo)))) {
        this.auxStatusBeginDateFromMin = new Date(Date.parse(value));
        this.auxStatusBeginDateTo = null;
      }
    }
  }

  changeStatusBeginDateTo(value) {
    if (value) {
      if (value.length) {
        this.auxStatusBeginDateTo = this.auxStatusBeginDateTo.trim();
      }
      if (value.length === 10) {
        if (new Date(Date.parse(value)) > this.date) {
          this.auxStatusBeginDateTo = '';
        }
        if (new Date(Date.parse(value)) <= this.auxStatusBeginDateFromMin) {
          this.auxStatusBeginDateTo = '';
        }
      }
      if (value.length > 10) {
        this.auxStatusBeginDateTo = '';
      }
    }
  }

  onSubmitFilterColumnAccounts(form) {

    if (form.value.licensePlate) {
      console.log('EEEE');
      this.filtersColumnAccounts.licensePlate = form.value.licensePlate.trim();
    }

    this.viewSoatService.sendFilterSoats(this.filtersColumnAccounts);

    /*this.filtersColumnAccounts.page = 0;


    if (this.filterName === 'AccountNumber' && !form.value.AccountNumber) {
      this.filtersColumnAccounts.advancedSearchDTO.accountNumber = null;
    }

    if (this.filterName === 'LegalName' && form.value.LegalName) {
      this.filtersColumnAccounts.advancedSearchDTO.legalName = form.value.LegalName;
    }
    if (this.filterName === 'LegalName' && !form.value.LegalName) {
      this.filtersColumnAccounts.advancedSearchDTO.legalName = null;
    }

    if (this.filterName === 'NPI' && form.value.NPI) {
      this.filtersColumnAccounts.advancedSearchDTO.npi = form.value.NPI;
      ;
    }

    if (this.filterName === 'NPI' && !form.value.NPI) {
      this.filtersColumnAccounts.advancedSearchDTO.npi = null;
    }

    if (this.filterName === 'StatusBeginDate' &&
      (form.value.StatusBeginDateFrom || form.value.StatusBeginDateTo)) {
      if (form.value.StatusBeginDateFrom && !form.value.StatusBeginDateTo) {
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom = new Date(form.value.StatusBeginDateFrom).toISOString();
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo = null;
        this.auxStatusBeginDateFrom = form.value.StatusBeginDateFrom;
        this.auxStatusBeginDateTo = null;
      }
      if (!form.value.StatusBeginDateFrom && form.value.StatusBeginDateTo) {
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom = null;
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo = new Date(form.value.StatusBeginDateTo).toISOString();
        this.auxStatusBeginDateFrom = null;
        this.auxStatusBeginDateTo = form.value.StatusBeginDateTo;
      }

      if (form.value.StatusBeginDateFrom && form.value.StatusBeginDateTo) {
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom = new Date(form.value.StatusBeginDateFrom).toISOString();
        const auxBeginDateFrom = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom.substring(11, 24);
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom.replace(auxBeginDateFrom, '00:00:00.000Z');

        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo = new Date(form.value.StatusBeginDateTo).toISOString();
        const auxBeginDateTo = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo.substring(11, 24);
        this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo = this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo.replace(auxBeginDateTo, '12:59:00.000Z');
        this.auxStatusBeginDateFrom = form.value.StatusBeginDateFrom;
        this.auxStatusBeginDateTo = form.value.StatusBeginDateTo;
      }
    }

    if (this.filterName === 'StatusBeginDate' &&
      ((form.value.StatusBeginDateFrom === '' && form.value.StatusBeginDateTo === '') ||
        (!form.value.StatusBeginDateFrom && !form.value.StatusBeginDateTo))
    ) {
      this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateFrom = null;
      this.filtersColumnAccounts.advancedSearchDTO.statusBeginDateTo = null;
    }


    if (this.filterName === 'StatusAcc' && form.value.StatusAcc) {
      this.filtersColumnAccounts.advancedSearchDTO.statusAcc = form.value.StatusAcc.toLowerCase();
    }
    if ((this.filterName === 'StatusAcc' && form.value.StatusAcc === 'null') ||
      (this.filterName === 'StatusAcc' && !form.value.StatusAcc)) {
      this.filtersColumnAccounts.advancedSearchDTO.statusAcc = null;
    }


    if (this.filterName === 'ProviderType' && form.value.ProviderType) {
      this.filtersColumnAccounts.advancedSearchDTO.providerType = form.value.ProviderType;
    }
    if ((this.filterName === 'ProviderType' && form.value.ProviderType === 'null') ||
      (this.filterName === 'ProviderType' && !form.value.ProviderType)) {
      this.filtersColumnAccounts.advancedSearchDTO.providerType = null;
    }


    if (this.filterName === 'AccountTypeDescriptor' && form.value.AccountTypeDescriptor) {
      this.filtersColumnAccounts.advancedSearchDTO.accountTypeDescriptor = form.value.AccountTypeDescriptor;
    }
    if ((this.filterName === 'AccountTypeDescriptor' && form.value.AccountTypeDescriptor === 'null') ||
      (this.filterName === 'AccountTypeDescriptor' && !form.value.AccountTypeDescriptor)) {
      this.filtersColumnAccounts.advancedSearchDTO.accountTypeDescriptor = null;
    }


    this.aux = null;

    if (this.queueType === 'active') {
      this.accountListService.sendFilterAccountsActive(this.filtersColumnAccounts);
    }
    if (this.queueType === 'all') {
      this.accountListService.sendFilterAccountsAll(this.filtersColumnAccounts);
    }
    if (this.queueType === 'inactive') {
      this.accountListService.sendFilterAccountsInactive(this.filtersColumnAccounts);
    }
    if (this.queueType === 'pending') {
      this.accountListService.sendFilterAccountsPending(this.filtersColumnAccounts);
    }
    if (this.queueType === 'suspended') {
      this.accountListService.sendFilterAccountsSuspended(this.filtersColumnAccounts);
    }
    if (this.queueType === 'temp-suspended') {
      this.accountListService.sendFilterAccountsTempSuspended(this.filtersColumnAccounts);
    }*/
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

  onFocusLegalName() {
    this.statusSmartFilterLegalName = true;
  }

  onFocusNPI() {
    this.statusSmartFilterNPI = true;
  }
}













