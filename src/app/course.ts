import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileItem } from 'ng2-file-upload';
import { IgucaService } from './services/iguca-service.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';


export class IgucaCompany {

  _id = '';
  courses = [];
  name = '';

  constructor() {
    const date = new Date();
    this._id = String(date.getTime());
  }
}

export class IgucaQuestion {
  a = '';
  b = '';
  c = '';
  d = '';
  e = '';
  f = '';
  g = '';
  h = '';
  correct = '';
  question = '';
  number = 0;
}

export class IgucaCourse {
  _id = '';
  finalExam: IgucaQuestion[] = [];
  name = '';

  constructor() {
    const date = new Date();
    this._id = String(date.getTime());
  }
}

export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

export class Database {
  public courses: AngularFireList<IgucaCourse>;
  public companies: AngularFireList<any>;
  public existingCoures: any[];
  public existingCompanies: any[];
  public igucaService = new IgucaService();
  deleteCourse: AngularFireList<any>;
  deleteCompany: AngularFireList<any>;
  items: Observable<any[]>;
  IgucaCourses: IgucaCourse[] = [];
  IgucaCompanies: IgucaCompany [] = [];
  igucaCoursesName = [];
  coursesKeys = [];
  companiesKeys = [];
  deleter: AngularFireDatabase;
  iskeysCharged = false;
  chargedCourses = new Subject();
  chargedCompanies = new Subject();

  constructor(db: AngularFireDatabase) {
    this.courses = db.list('/Cursos');
    this.deleteCourse = db.list('/Cursos');
    this.companies = db.list('/Companies');
    this.deleteCompany = db.list('/Companies');
    this.deleter = db;

    db.list('/Cursos').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ( a.key ))
      )
    ).subscribe(items => {
      this.coursesKeys = items;
      this.chargedCourses.next(true);
    });

    db.list('/Companies').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ( a.key ))
      )
    ).subscribe(items => {
      this.companiesKeys = items;
      this.chargedCompanies.next(true);
    });


    db.list('/Cursos').valueChanges().subscribe((Courses) => {
      this.existingCoures = Courses;
      for (let _i = 0; _i < this.existingCoures.length ; _i++) {
        this.IgucaCourses[_i] = new IgucaCourse();
        this.IgucaCourses[_i].name = this.existingCoures[_i].name;
        this.IgucaCourses[_i].finalExam = this.existingCoures[_i].finalExam;
        this.IgucaCourses[_i]._id = this.existingCoures[_i]._id;
      }
      for (let _k = 0; _k < this.IgucaCourses.length ; _k++) {
        this.igucaCoursesName[_k] = this.IgucaCourses[_k].name;
      }
    });

    db.list('/Companies').valueChanges().subscribe((Companies) => {
      this.existingCompanies = Companies;
      for (let _i = 0; _i < this.existingCompanies.length ; _i++) {
        this.IgucaCompanies[_i] = new IgucaCompany();
        this.IgucaCompanies[_i].name = this.existingCompanies[_i].name;
        this.IgucaCompanies[_i].courses = this.existingCompanies[_i].courses;
        this.IgucaCompanies[_i]._id = this.existingCompanies[_i]._id;
      }
    });

  }

  addCourse(newCourse: IgucaCourse) {
    const key = this.courses.push(newCourse).key;
    return key;
  }

  addCompany(newCompany: IgucaCompany) {
    const key = this.companies.push(newCompany).key;
    return key;
  }

  deleteCompanyByKey(i: number) {
    try {
      this.deleter.list('/Companies/' + this.companiesKeys[i]).remove();
    } catch (e) {
      console.log(e);
    }
  }

  deleteCoursesByKey(i: number) {
    try {
      this.deleter.list('/Cursos/' + this.coursesKeys[i]).remove();
    } catch (e) {
      console.log(e);
    }
  }

  /* function that can delete of find items by especific child fields, they can be usefull in the future
  deleteCourseDB( Child: string, equalTo: string ) {
    const deleteQuery = this.deleteCourse.query.orderByChild(Child).equalTo(equalTo);
    deleteQuery.once('value', function(snapshot) {
      snapshot.forEach(function(child) {
        child.ref.remove();
      });
    });
  }

  deleteCompanyDB( Child: string, equalTo: string ) {
     const deleteQuery = this.deleteCompany.query.orderByChild(Child).equalTo(equalTo);
     deleteQuery.once('value', function(snapshot) {
       snapshot.forEach(function(child) {
         child.ref.remove();
       });
    });
  } */


  updateCourse(igucaCourse: IgucaCourse, key: string) {
    try {
      this.courses.update( key, igucaCourse);
    } catch (e) {
      console.log(e);
    }
  }

  updateCompany(igucaCompany: IgucaCompany, key: string) {
    try {
      this.companies.update( key, igucaCompany);
    } catch (e) {
      console.log(e);
    }
  }
  keyToName(keyList: any[]) {
    const names = [];
    for (let i = 0; i < keyList.length; i++) {
      for (let k = 0; k < this.IgucaCourses.length; k++) {
        if (keyList[i] === this.coursesKeys[k]) {
          names.push(this.IgucaCourses[k].name);
        }
      }
    }
    return names;
  }
}
