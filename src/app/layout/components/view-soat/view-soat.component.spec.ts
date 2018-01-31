import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSoatComponent } from './view-soat.component';

describe('ViewSoatComponent', () => {
  let component: ViewSoatComponent;
  let fixture: ComponentFixture<ViewSoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
