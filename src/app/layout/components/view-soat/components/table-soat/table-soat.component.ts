import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnChanges
} from '@angular/core';

import {DialogService} from 'ng2-bootstrap-modal';
import {SoatPdfComponent} from '../../../../../shared/components/soat-pdf/soat-pdf.component';

/*import {
  breakpointsProvider,
  BreakpointsService,
  BreakpointEvent
} from '../../../../../shared/_services/breakpoints.service';
import {PagerService} from '../../../../../shared/_services/pager.service';
import {RoundProgressConfig} from 'angular-svg-round-progressbar';
import {DialogService} from 'ng2-bootstrap-modal';
import {AccountListService} from '../../../../services';
import {AdvancedSearchDto} from '../../../../class';*/
import {Router} from '@angular/router';
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-table-soat',
  templateUrl: './table-soat.component.html',
  styleUrls: ['./table-soat.component.scss']
})

export class TableSoatComponent implements OnInit, OnChanges {

  @Input() headers: any;
  @Input() data: any;
  @Input() pageSize: number;
  @Input() total: number;
  @Input() perPage: number;
  @Input() dataPaging: boolean;
  @Input() selectedIndex: number;
  @Input() globalFilter: any[] = [];
  @Input() IsMailBoxTableTD: boolean;
  @Input() childTableClass: string;
  @Input() childRowClass: string;
  @Input() key: string;
  @Input() anchorColumnNames: string;
  @Input() IsExpandedMode: boolean;
  @Input() resetPagination: string;
  @Input() queueType: string;
  @Input() filterTable: any;
  //@Output() selectedRow = new EventEmitter<any>();
  @Output() updatePagination = new EventEmitter<any>();
  @Output() updateSort = new EventEmitter<any>();
  @Output() anchorClicked = new EventEmitter<any>();

  listPage: number;
  listPerPage: number;
  InternalChildRowClass: string;
  InternalChildTableClass: string;
  isExpandable = false;
  viewPort = '';
  internalGlobalFilter: any;
  internalHeaders: any;
  internalData: any;
  internalDataWithoutFilter: any;
  internalNeedActionBox: boolean;
  internalPageSize: number;
  internalPageSizeChart: any;
  internalDataPaging = false;
  InternalShowReviewerMapping: boolean;
  InternalIsMailBoxTableTD: boolean;
  InternalKey: string;
  InternalSelectedIndex = 0;
  internalAnchorColumnNames = '';
  internalIsExpandedMode = false;
  internalresetPagination = '';
  rowExpandIndex: number = -1;
  colFilterIndex: number = -1;
  column = '';
  isDesc = false;
  showActionBox = false;
  offsetTop: number;
  offsetLeft: number;
  toppopup = true;
  pager: any = {};
  pagedItems: any[] = [];

  constructor(private router: Router,
              private dialogService: DialogService) {


  }

  ngOnInit() {

    this.isExpandable = this.Expandable();
  }

  verifyFiltersField(filter, nameColumn) {
    if (filter !== null) {
      this.setStatusIcon({NameColumn: nameColumn, Status: 'active'});
    } else if (filter === null) {
      this.setStatusIcon({NameColumn: nameColumn, Status: 'inactive'});
    }
  }





  ngOnChanges(changes: any): void {



    let setPageRequired = false;
    let updateEmitRequired = false;

    if (changes !== undefined && changes.childTableClass !== undefined && changes.childTableClass.currentValue) {
      this.InternalChildTableClass = changes.childTableClass.currentValue;
    }
    if (changes !== undefined && changes.childRowClass !== undefined && changes.childRowClass.currentValue) {
      this.InternalChildRowClass = changes.childRowClass.currentValue;
    }

    if (changes !== undefined && changes.anchorColumnNames !== undefined && changes.anchorColumnNames.currentValue) {
      this.internalAnchorColumnNames = changes.anchorColumnNames.currentValue;
    }

    if (this.selectedIndex !== undefined) {
      this.InternalSelectedIndex = this.selectedIndex;
    }


    if (changes !== undefined && changes.selectedIndex !== undefined && changes.selectedIndex.currentValue >= 0) {
      this.InternalSelectedIndex = changes.selectedIndex.currentValue;
    }
    if (changes !== undefined && changes.dataPaging !== undefined && changes.dataPaging.currentValue) {
      this.internalDataPaging = changes.dataPaging.currentValue;
    }
    if (changes !== undefined && changes.needActionBox !== undefined && changes.needActionBox.currentValue) {
      this.internalNeedActionBox = changes.needActionBox.currentValue;
    }
    if (changes !== undefined && changes.headers !== undefined && changes.headers.currentValue) {
      this.internalHeaders = changes.headers.currentValue;
      this.DoToggleExpandedMode();
      this.isExpandable = this.Expandable();
      this.fillAutoFilterSource();
    }

    if (changes !== undefined && changes.resetPagination !== undefined) {
      this.internalresetPagination = changes.resetPagination.currentValue;
      if (this.internalresetPagination !== undefined) {
        if (this.internalresetPagination.startsWith('reset')) {
          this.UpdatePagination(1);
        }
      }
    }

    if (changes !== undefined && changes.IsExpandedMode !== undefined) {
      this.internalIsExpandedMode = changes.IsExpandedMode.currentValue;
      this.DoToggleExpandedMode();
      this.isExpandable = this.Expandable();
    }
    if (changes !== undefined && changes.data !== undefined && changes.data.currentValue) {
      const data = changes.data.currentValue;
      let i = 1;
      for (const v of data) {
        v.globalRowIndex = i;
        i = i + 1;
      }
      this.internalData = changes.data.currentValue;
      if (changes.data.currentValue instanceof Array) {
        this.pagedItems = changes.data.currentValue;
      }
      this.internalDataWithoutFilter = changes.data.currentValue;
      setPageRequired = true;
      updateEmitRequired = true;
      this.fillAutoFilterSource();
    }
    if (changes !== undefined && changes.internalData !== undefined && changes.internalData.currentValue) {
      updateEmitRequired = true;
    }

    if (changes !== undefined && changes.pageSizeChart !== undefined && changes.pageSizeChart.currentValue) {
      this.internalPageSizeChart = changes.pageSizeChart.currentValue;
      setPageRequired = true;
    }
    if (changes !== undefined &&
      changes.updateCheckboxForARecord !== undefined &&
      changes.updateCheckboxForARecord.currentValue) {
      const record: any = changes.updateCheckboxForARecord.currentValue;
      if (record !== undefined &&
        record !== null &&
        record.property !== undefined &&
        record.property !== null) {
        const i: number = this.internalDataWithoutFilter.findIndex(x => x[record.property] === record.propertyValue);
        if (i > -1) {
          this.internalDataWithoutFilter[i].IsChecked = record.IsChecked;
        }
      }
    }

    if (changes !== undefined && changes.showReviewerMapping !== undefined) {
      this.InternalShowReviewerMapping = changes.showReviewerMapping.currentValue;
    }

    if (changes !== undefined && changes.IsMailBoxTableTD !== undefined) {
      this.InternalIsMailBoxTableTD = changes.IsMailBoxTableTD.currentValue;
    }

    if (changes !== undefined && changes.globalFilter !== undefined) {
      updateEmitRequired = false;
      this.internalGlobalFilter = changes.globalFilter.currentValue;
    }


  }

  DoToggleExpandedMode() {
    if (this.internalHeaders === null || this.internalHeaders === undefined) {
      return;
    }
    for (const v of this.internalHeaders) {
      if (v.toggleOnExpandedMode) {
        if (this.internalIsExpandedMode) {
          if (v.breakpoints.slice(-3) === ',lg') {
            v.breakpoints = v.breakpoints.slice(0, -3);
          }
        } else {
          if (v.breakpoints.slice(-3) !== ',lg') {
            v.breakpoints = v.breakpoints + ',lg';
          }
        }
      }
    }
  }

  checkAnchorColumn(name: string) {
    if (this.internalAnchorColumnNames.split(',').indexOf(name) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  AnchorColumn_Clicked(item) {
    this.anchorClicked.emit({
      selectedItem: item
    });
  }

  fillAutoFilterSource() {


    if (this.internalHeaders === undefined || this.internalHeaders === null) {
      return;
    }
    for (let v of this.internalHeaders) {
      v.autoCompleteDataSource = [];
      const autoComplete: Array<string> = [];

      if (v.autoFilterRequired !== undefined &&
        v.autoFilterRequired !== null &&
        v.autoFilterRequired && this.internalData !== undefined) {
        for (let d of this.internalData) {
          if (autoComplete.findIndex(x => x === d[v.name]) === -1) {
            autoComplete.push(d[v.name]);
          }
        }
      }
      v.autoCompleteDataSource = autoComplete;
    }
  }

  ShowExpand(index: number) {
    this.rowExpandIndex = index;
    this.showActionBox = false;
  }

  ShowExpandMinus() {
    this.rowExpandIndex = -1;
    this.showActionBox = false;
  }

  Expandable() {
    if (this.internalHeaders === undefined || this.internalHeaders === null) {
      return false;
    }
    for (let v of this.internalHeaders) {
      if (v.breakpoints !== undefined && v.breakpoints !== null && v.breakpoints !== '') {
        if (v.breakpoints.split(',').findIndex(item => item === this.viewPort) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  ColumnVisibility(breakpoints: string) {
    if (breakpoints === undefined || breakpoints === null || breakpoints === '')
      return true;
    let array = breakpoints.split(',');
    return array.findIndex(item => item === this.viewPort) === -1 ? true : false;
  }

  UpdateSort(item: any) {
    const property: string = item.name;
    this.isDesc = !this.isDesc;
    this.column = property;

    this.updateSort.emit({
      isDesc: this.isDesc,
      column: this.column
    });
  }

  setStatusIcon(event) {
    this.headers.map(
      value => {
        if (value.name === event.NameColumn) {
          if (event.Status === 'active') {
            value.filterClass = 'filter-active';
          } else if (event.Status === 'inactive') {
            value.filterClass = '';
          }
          this.colFilterIndex = -1;
        }
      }
    );
  }

  closeFilter() {
    this.colFilterIndex = -1;
  }

  SelectedRow(item: any, index: number, e: any) {
    this.dialogService.addDialog(SoatPdfComponent , {soat: item});



    /*let isHasClass = false;
    if (e.target.classList.contains('collapsable_btn') || e.target.classList.contains('control__indicator')
      || e.target.classList.contains('percent') || e.target.classList.contains('risk_score_pop')) {
      isHasClass = true;
    }
    this.InternalSelectedIndex = index;
    this.selectedRow.emit({
      selectedItem: item,
      selectedIndex: index,
      isShowRHS: isHasClass
    });*/
  }

  DaysPercentage(Days: number, TotalDays: number) {
    if (Days < 0) {
      return 100;
    }
    if (TotalDays < 0 || Days === null) {
      return 0;
    }
    if (TotalDays < 0) return 0;
    let percent = (Days / TotalDays) * 100;
    return (100 - percent);
  };

  Fun_Milestone_color(milestone: string) {
    if (milestone === 'Proposed Denied')
      return 'denied';
    else if (milestone === 'Assigned')
      return 'assigned';
    else if (milestone === 'Return to Provider')
      return 'return';
  }

  UpdatePagination(page: number) {
      }

  Fun_round_progress_colorInCase(list: number) {
    if (list <= 150 || null)
      return '#008000';
    else if (list >= 151 && list <= 250)
      return '#ffbf00';
    else if (list >= 251 && list <= 499)
      return '#ff8b00';
    else if (list >= 500 && list <= 750)
      return '#FF0000';
    else if (list > 750)
      return '#8B0000';
    else return '#008000';
  }
}
