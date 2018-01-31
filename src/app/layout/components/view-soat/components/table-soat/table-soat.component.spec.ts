import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSoatComponent } from './table-soat.component';

describe('TableSoatComponent', () => {
  let component: TableSoatComponent;
  let fixture: ComponentFixture<TableSoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
