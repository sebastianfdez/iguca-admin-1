export class Course {





  public Id = '';
  public company = '';
  public question = [];
  public documents = [];
  public finalExam = [];




  constructor(Id: String , company: String ) {
    this.Id = Id;
    this.company = company;
    console.log(this.Id);
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


}
