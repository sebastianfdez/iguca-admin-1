import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
// import { Observable } from 'rxjs';



export class IgucaQuestion {
  a = '';
  b = '';
  c = '';
  d = '';
  correct = '';
  question = '';
  number = 0;
}

export class IgucaCourse {
  _id = '';
  company = '';
  documents: string[] = [];
  exersices: string[] = [];
  finalExam: IgucaQuestion[] = [];
  name = '';
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
  public cursos: {}[];

  constructor(db: AngularFireDatabase) {
       this.courses = db.list('/Cursos');
        db.list('/Cursos').valueChanges().subscribe(Courses => {
        this.cursos = Courses;
    });
  }
  addElement(newcCourse: IgucaCourse) {
    this.courses.push(newcCourse);
  }
  getElemnt() {
    console.log(this.cursos);
  }
}
