import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IgucaService } from './services/iguca-service.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';



export class IgucaCompany {

  _id = '';
  idSence = [];
  courses = [];
  name = '';

  constructor() {
    const date = new Date();
    this._id = String(date.getTime()); // bulding a own ID, may be useful in the future
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
  correct = ''; // correct answer of the question
  question = '';
  number = 0;
}

export class IgucaCourse {
  _id = '';
  finalExam: IgucaQuestion[] = [];
  name = '';
  expireDate: any;
  description = '';

  constructor() {
    const date = new Date();
    this._id = String(date.getTime());
  }

}

export class UserReport {
  company = '';
  rut = '';
  userName = '';
  idSence = '';
  score = '';
  questions: string[];
  userMail = '';
  date = '';
}

export class IgucaReport {
  courseReport: UserReport[] = []; // each Iguca Course have many userReports
}

export class Database {
  public courses: AngularFireList<IgucaCourse>;
  public companies: AngularFireList<any>;
  public idSences: AngularFireList<any>;

  public existingCoures: any[];
  public existingCompanies: any[];
  public existingIdSence: any[];
  public existingReports: any[];

  public igucaService = new IgucaService();

  deleteCourse: AngularFireList<any>;
  deleteCompany: AngularFireList<any>;
  items: Observable<any[]>;

  IgucaCourses: IgucaCourse[] = [];
  IgucaCompanies: IgucaCompany[] = [];
  IgucaReports: IgucaReport[] = [];

  igucaCoursesName = [];

  coursesKeys = [];
  companiesKeys = [];
  reportsKeys = [];

  deleter: AngularFireDatabase;
  asker: AngularFireDatabase;
  iskeysCharged = false;

  chargedCoursesKeys = new Subject();
  chargedCourses = new Subject();
  chargedCompaniesKeys = new Subject();
  chargedCompanies = new Subject();
  chargedReportsKeys = new Subject();
  chargedReports = new Subject();



  constructor(db: AngularFireDatabase) {
    this.courses = db.list('/Cursos');
    this.deleteCourse = db.list('/Cursos');
    this.companies = db.list('/Companies');
    this.deleteCompany = db.list('/Companies');
    this.deleter = db;

    db.list('/Cursos').snapshotChanges().pipe(  // storgare the firebase realtime database keys for courses
      map(actions =>
        actions.map(a => ( a.key ))
      )
    ).subscribe(items => {
      this.coursesKeys = items;
      this.chargedCoursesKeys.next(true);
    });

    db.list('/Companies').snapshotChanges().pipe( // storgare the firebase realtime database keys for companies
      map(actions =>
        actions.map(a => ( a.key ))
      )
    ).subscribe(items => {
      this.companiesKeys = items;
      this.chargedCompaniesKeys.next(true);
    });

    db.list('/Reports').snapshotChanges().pipe( // storgare the firebase realtime database keys for reports
      map(actions =>
        actions.map(a => ( a.key ))
      )
    ).subscribe(items => {
      this.reportsKeys = items;
      this.chargedReportsKeys.next(true);
    });


    db.list('/Cursos').valueChanges().subscribe((Courses) => { // load the courses from teh database
      this.existingCoures = Courses;
      for (let _i = 0; _i < this.existingCoures.length ; _i++) {
        this.IgucaCourses[_i] = new IgucaCourse();
        this.IgucaCourses[_i].name = this.existingCoures[_i].name;
        this.IgucaCourses[_i].finalExam = this.existingCoures[_i].finalExam;
        this.IgucaCourses[_i]._id = this.existingCoures[_i]._id;
        this.IgucaCourses[_i].description = this.existingCoures[_i].description;
        this.IgucaCourses[_i].expireDate = this.existingCoures[_i].expireDate;
      }
      for (let _k = 0; _k < this.IgucaCourses.length ; _k++) {
        this.igucaCoursesName[_k] = this.IgucaCourses[_k].name;
      }
      this.chargedCourses.next(true);
    });

    db.list('/Companies').valueChanges().subscribe((Companies) => { // load the companies from teh database
      this.existingCompanies = Companies;
      for (let _i = 0; _i < this.existingCompanies.length ; _i++) {
        this.IgucaCompanies[_i] = new IgucaCompany();
        this.IgucaCompanies[_i].name = this.existingCompanies[_i].name;
        this.IgucaCompanies[_i].courses = this.existingCompanies[_i].courses;
        this.IgucaCompanies[_i].idSence = this.existingCompanies[_i].idSence;
        this.IgucaCompanies[_i]._id = this.existingCompanies[_i]._id;
      }
      this.chargedCompanies.next(true);
    });

    db.list('/Reports').valueChanges().subscribe((Reports) => { // load the reports from teh database
      this.existingReports = Reports;
      for (let _i = 0; _i < this.existingReports.length ; _i++) { // => how many course have reports
        this.IgucaReports[_i] = new IgucaReport();
        for (let k = 0; k < Object.keys(this.existingReports[_i]).length; k++) {
          this.IgucaReports[_i].courseReport[k] = new UserReport();
          this.IgucaReports[_i].courseReport[k].company = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].company;
          this.IgucaReports[_i].courseReport[k].rut = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].rut;
          this.IgucaReports[_i].courseReport[k].userName = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].userName;
          this.IgucaReports[_i].courseReport[k].idSence = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].idSence;
          this.IgucaReports[_i].courseReport[k].questions = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].questions;
          this.IgucaReports[_i].courseReport[k].score = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].score;
          this.IgucaReports[_i].courseReport[k].userMail = this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].mail;
          const date = new Date(this.existingReports[_i][Object.keys(this.existingReports[_i])[k]].date);
          const aux = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString() +
          ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
          this.IgucaReports[_i].courseReport[k].date = aux;
        }
      }
      this.chargedReports.next(true);
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
      this.removeOldCompanyCourses(this.coursesKeys[i]);
      this.deleter.list('/Reports/' + this.coursesKeys[i]).remove(); // delete the course report
    } catch (e) {
      console.log(e);
    }
  }

  deleteReportByKey(i: number) {
    try {
      this.deleter.list('/Reports/' + this.reportsKeys[i]).remove();
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

  getCourseAnswer(key: string) { // gets the corrects answers for the final examan for a especific course using his key
    const list = [];
    let position = null;
    for (let i = 0; i < this.coursesKeys.length; i++) {
      if (key === this.coursesKeys[i]) {
        position = i;
      }
    }
    this.IgucaCourses[position].finalExam.forEach(element => {
      list.push(element.correct.charAt(0).toUpperCase());
    });
    return list;
  }


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


  keyToName(keyList: any[]) { // recive a course database key list and returns a list of the names of thous courses
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

  removeOldCompanyCourses(key: String) { // makes sure that unsuscribe the courses to company client when deleting a especific sourse
    for (let i = 0; i < this.IgucaCompanies.length; i++) {
      for (let k = 0; k < this.IgucaCompanies[i].courses.length; k++) {
        if (key === this.IgucaCompanies[i].courses[k]) {

          this.IgucaCompanies[i].courses = this.IgucaCompanies[i].courses.filter((course_) => {
            return course_ !== this.IgucaCompanies[i].courses[k];
          });
          this.IgucaCompanies[i].idSence = this.IgucaCompanies[i].idSence.filter((idSence_) => {
            return idSence_ !== this.IgucaCompanies[i].idSence[k];
          });
          this.updateCompany(this.IgucaCompanies[i], this.companiesKeys[i]);

        }
      }
    }
  }
}
