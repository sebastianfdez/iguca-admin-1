import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/src';

export class Course {

  public courses = [];
  public name = '';
  public Id = '';
  public company = '';
  public question = [];
  public documents = [];
  public finalExam = [];

  constructor() {}

  getId() {
    return this.Id;
  }

  getFinalExam() {
    return this.finalExam;
  }

  addQuestion(quest: string[]) {
    this.question = quest;
    this.finalExam.push(this.question);
    console.log(this.finalExam);
  }

  setId(id: string) {
    this.Id = id;
  }

  setName(name: string) {
    this.name = name;
  }
  serCompany(company: string) {
    this.company = company;
  }
  deleteQuestion(position: number) {
    this.finalExam.splice( position , 1 );
    console.log('eliminado');
    console.log(this.finalExam);
    console.log(position);
  }
  writeCourse() {
    console.log('probando mandar');
    courses.push([this.name, this.Id, this.documents, this.finalExam]);
  }

}

export class IgucaQuestion {
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
  question: string;
  number: number;
}
