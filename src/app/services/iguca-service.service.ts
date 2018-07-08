import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IgucaService {

  private closeEditCourses = new Subject();
  public closeEditCourses$ = this.closeEditCourses.asObservable();

  private closeEditCompany = new Subject();
  public closeEditCompany$ = this.closeEditCompany.asObservable();

  private closeReports = new Subject();
  public closeReports$ = this.closeReports.asObservable();

  private loggedUser = new Subject();
  public loggedUser$ = this.loggedUser.asObservable();

  private areKeysLoaded = new Subject();
  public areKeysLoaded$ = this.areKeysLoaded.asObservable();

  public chargeUrl() {
    this.areKeysLoaded.next(true);
    console.log('aca');
  }

  public closeExistingCourses() {
    this.closeEditCourses.next(true);
  }

  public closeExistingCompany() {
    this.closeEditCompany.next(true);
  }

  public closeReport() {
    this.closeReports.next(true);
  }

  public userLogIn() {
    this.loggedUser.next();
  }


  constructor() { }
}


