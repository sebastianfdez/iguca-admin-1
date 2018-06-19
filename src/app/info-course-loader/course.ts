export class Course {

  public name = '';
  public Id = '';
  public company = '';
  public question = [];
  public documents = [];
  public finalExam = [];

  constructor() {
}

  getId() {
    return this.Id;
  }

  getFinalExam() {
    return this.finalExam;
  }

  addQuestion(quest: []) {
    this.question = quest;
    this.finalExam.push(this.question);
    console.log(this.finalExam);
  }

  setId(id: String) {
    this.Id = id;
  }

  setName(name: String) {
    this.name = name;
  }
  serCompany(company: String) {
    this.company = company;
  }
  deleteQuestion(position: number) {
    this.finalExam.splice( position , 1 );
    console.log('eliminado');
    console.log(this.finalExam);
    console.log(position);
  }


}
