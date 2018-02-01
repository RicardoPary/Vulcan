import {Component, OnInit, OnDestroy} from '@angular/core';
import {Soat} from '../../../shared/class/soat';
import {FormSoatService, ViewSoatService, FilterSoat} from '../../../shared/index';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-view-soat',
  templateUrl: './view-soat.component.html',
  styleUrls: ['./view-soat.component.scss']
})
export class ViewSoatComponent implements OnInit, OnDestroy {

  subscriptionSoatsBusy: Subscription;
  tabnameForSearch = 'All';
  allSoatsList: Soat[] = [];
  user: any;
  totalSoats: number;

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

    this.viewSoatService.currentFilterSoats().subscribe(
      dates => {
        console.log(dates);
        this.getData(dates);
      }
    );

  }

  ngOnInit() {

  }

  getData(filterSoat: FilterSoat) {
    this.formSoatService.getAccount().subscribe(
      response => {
        filterSoat.userId = response.json().id;
        this.viewSoatService.getAllSoats(filterSoat).subscribe(
          soats => this.allSoatsList = soats.json()
        );

        this.subscriptionSoatsBusy = this.viewSoatService.getAll(response.json().id).subscribe(
          dates => {
            this.totalSoats = dates.json().length;
          }
        );
      }
    );
  }

  viewAdvancedSearchAccounts() {
    this.statusViewAdvancedSearchAccounts = !this.statusViewAdvancedSearchAccounts;
  }

  paginationClick(event: any) {
    const filter = this.viewSoatService.getFilterSoats();
    filter.page = (event.newPage) - 1;
    this.viewSoatService.sendFilterSoats(filter);
  }

  ngOnDestroy() {
    this.subscriptionSoatsBusy.unsubscribe();
  }
}
