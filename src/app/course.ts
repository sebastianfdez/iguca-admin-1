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
