import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IgucaService {
  private closeEditCourses = new Subject();
  public closeEditCourses$ = this.closeEditCourses.asObservable();

  private closeEditCompany = new Subject();
  public closeEditCompany$ = this.closeEditCompany.asObservable();

  private loggedUser = new Subject();
  public loggedUser$ = this.loggedUser.asObservable();

  public closeExistingCourses() {
    this.closeEditCourses.next(true);
  }

  public closeExistingCompany() {
    this.closeEditCompany.next(true);
  }

  public userLogIn() {
    this.loggedUser.next();
  }

  constructor() { }

}


