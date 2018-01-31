import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoatPdfComponent } from './soat-pdf.component';

describe('SoatPdfComponent', () => {
  let component: SoatPdfComponent;
  let fixture: ComponentFixture<SoatPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoatPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoatPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
