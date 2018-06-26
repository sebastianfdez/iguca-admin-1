import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCompaniesComponent } from './existing-companies.component';

describe('ExistingCompaniesComponent', () => {
  let component: ExistingCompaniesComponent;
  let fixture: ComponentFixture<ExistingCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
