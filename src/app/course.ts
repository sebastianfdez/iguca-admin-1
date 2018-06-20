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
