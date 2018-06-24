import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IgucaCourse } from '../course';

@Injectable()
export class IgucaService {
  private closeEditCourses = new Subject();
  public closeEditCourses$ = this.closeEditCourses.asObservable();

  public closeExistingCourses() {
    this.closeEditCourses.next(true);
  }

  constructor() { }

}


