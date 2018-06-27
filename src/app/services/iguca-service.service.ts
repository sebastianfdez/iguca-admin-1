import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IgucaService {
  private closeEditCourses = new Subject();
  public closeEditCourses$ = this.closeEditCourses.asObservable();

  private closeEditCompany = new Subject();
  public closeEditCompany$ = this.closeEditCompany.asObservable();

  public closeExistingCourses() {
    this.closeEditCourses.next(true);
  }

  public closeExistingCompany() {
    this.closeEditCompany.next(true);
  }

  constructor() { }

}


