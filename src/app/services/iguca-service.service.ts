import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IgucaService {

  private closeEditCourses = new Subject();
  public closeEditCourses$ = this.closeEditCourses.asObservable();

  private closeEditCompany = new Subject();
  public closeEditCompany$ = this.closeEditCompany.asObservable();

  private coursesCharged = new Subject();
  public coursesCharged$ = this.coursesCharged.asObservable();

  public companiesCharged = new Subject();
  public companiesCharged$ = this.companiesCharged.asObservable();

  constructor() { }

  public closeExistingCourses() {
    this.closeEditCourses.next(true);
  }

  public closeExistingCompany() {
    this.closeEditCompany.next(true);
  }

  public reChargeCourses() {
    this.coursesCharged.next(true);
    console.log('ahora2');
  }

  public reChargeCompanies() {
    this.companiesCharged.next(true);
  }

}


