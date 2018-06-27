import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileItem } from 'ng2-file-upload';
import { IgucaService } from './services/iguca-service.service';


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
  isCoursesCharged = false;
  isCompaniesCharged = false;
  IgucaCourses: IgucaCourse[] = [];
  IgucaCompanies: IgucaCompany [] = [];
  igucaCoursesName = [];

  constructor(db: AngularFireDatabase) {
    this.courses = db.list('/Cursos');
    this.deleteCourse = db.list('/Cursos');
    this.companies = db.list('/Companies');
    this.deleteCompany = db.list('/Companies');

   /*this.items = db.list('/Cursos').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.items); */


    // const newKey = db.database.ref().child('/Cursos').push().key;

    db.list('/Cursos').valueChanges().subscribe((Courses) => {
      this.existingCoures = Courses;
      for (let _i = 0; _i < this.existingCoures.length ; _i++) {
        this.IgucaCourses[_i] = new IgucaCourse();
        this.IgucaCourses[_i].name = this.existingCoures[_i].name;
        this.IgucaCourses[_i].finalExam = this.existingCoures[_i].finalExam;
        this.IgucaCourses[_i]._id = this.existingCoures[_i]._id;
      }
      this.isCoursesCharged = true;
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

   // console.log(Object.keys(db.list('/Cursos').snapshotChanges()));

  }

  addElement(newCourse: IgucaCourse) {
    this.courses.push(newCourse);
  }

  addCompany(newCompany: IgucaCompany) {
    this.companies.push(newCompany);
  }

  deleteElement( Child: string, equalTo: string ) {
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
  }


  getElement() {
    return this.existingCoures;
  }

  getComapny() {
    return this.existingCompanies;
  }

  updateElement(updateElement: IgucaCourse) {
    const replaceId = updateElement._id;
    this.deleteElement( '_id' , replaceId );
    this.addElement(updateElement);
  }

  updateCompany(updateElement: IgucaCompany) {
    const replaceId = updateElement._id;
    this.deleteCompanyDB( '_id' , replaceId );
    this.addCompany(updateElement);
  }
}
