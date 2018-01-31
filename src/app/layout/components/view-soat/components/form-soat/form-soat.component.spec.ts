import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoatComponent } from './form-soat.component';

describe('FormSoatComponent', () => {
  let component: FormSoatComponent;
  let fixture: ComponentFixture<FormSoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
