import {Component, OnInit} from '@angular/core';
import {Soat} from '../../../shared/class/soat';

import {FormSoatService} from '../../../shared/services/form-soat.service';
import {ViewSoatService} from '../../../shared/services/view-soat.service';

@Component({
  selector: 'app-view-soat',
  templateUrl: './view-soat.component.html',
  styleUrls: ['./view-soat.component.scss']
})
export class ViewSoatComponent implements OnInit {

  tabnameForSearch = 'All';
  allSoatsList: Soat[] = [];
  user: any;

  accountListColumn: any = [
    {
      name: 'id',
      displayName: 'Id',
      canSort: true,
      canfilter: false,
      filterType: 'Range',
      dataType: 'number',
      isCustomized: true,
      roundProgressbar: true,
      autoFilterRequired: false,
      class: 'risk_score'
    },
    {
      name: 'licensePlate',
      displayName: 'Licence Plate',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    },
    {
      name: 'year',
      displayName: 'Year',
      breakpoints: 'xxs',
      canSort: true,
      canfilter: true,
      filterType: 'StartsWith',
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'totalAmount',
      displayName: 'Total Mount',
      breakpoints: 'xxs,xs,sm,md',
      canSort: true,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'nitCustomer',
      displayName: 'Nit Customer',
      breakpoints: 'xxs,xs,md',
      canSort: true,
      canfilter: true,
      filterType: 'Equal',
      dataType: 'date',
      isCustomized: true,
      autoFilterRequired: false
    },
    {
      name: 'nameOrSocialReason',
      displayName: 'Name or Social Reason',
      breakpoints: 'xxs',
      canSort: true,
      canfilter: true,
      filterType: 'StartsWith',
      superdataType: 'string'
    },
    {
      name: 'email',
      displayName: 'e-mail',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    },
    {
      name: 'city',
      displayName: 'City',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    },
    {
      name: 'typeUse',
      displayName: 'Type Use',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    },
    {
      name: 'typeVehicle',
      displayName: 'Type Vehicle',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    },
    {
      name: 'purchaseType',
      displayName: 'Purchase Type',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: true
    }
  ];

  statusViewAdvancedSearchAccounts = false;

  constructor(private viewSoatService: ViewSoatService,
              private formSoatService: FormSoatService) {

  }

  ngOnInit() {
    this.formSoatService.getAccount().subscribe(
      response => {
        this.viewSoatService.getAllSoats(response.json().id).subscribe(
          soats => this.allSoatsList = soats.json()
        );
      }
    );
  }

  viewAdvancedSearchAccounts() {
    this.statusViewAdvancedSearchAccounts = !this.statusViewAdvancedSearchAccounts;
  }

}
