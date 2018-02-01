import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FilterSoat, ViewSoatService} from '../../../../../shared/index';

@Component({
  selector: 'app-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnComponent implements OnInit {

  date = new Date();
  @Input() queueType: string;
  @Input() filterDisplayName: string;
  @Input() filterName: string;
  @Input() dataType: string;
  @Output() clickCloseFilter = new EventEmitter<any>();
  filtersColumnAccounts: FilterSoat = new FilterSoat();
  statusSmartFilterAccountNumber = false;

  constructor(private viewSoatService: ViewSoatService) {
  }

  ngOnInit() {
    this.filtersColumnAccounts = this.viewSoatService.getFilterSoats();
  }

  closeFilter() {
    this.clickCloseFilter.emit();
  }

  onSubmitFilterColumnSoats(form) {
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
