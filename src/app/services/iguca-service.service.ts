import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IgucaCourse } from '../course';

@Injectable()
export class IgucaService {

  private courseCreatedSub = new Subject<IgucaCourse>();
  public courseCreatedObs$ = this.courseCreatedSub.asObservable();

  constructor() { }

  public newCourseCreated(newCourse: IgucaCourse) {
    this.courseCreatedSub.next(newCourse);
  }

}


