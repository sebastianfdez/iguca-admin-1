import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { IgucaCourse, IgucaQuestion, Database} from '../course';
import { IgucaService } from '../services/iguca-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseApp } from 'angularfire2';

const URL = ''; // aca debe ir la ruta donde los archivos llegan (conectar con la base de datos)

@Component({
  selector: 'app-info-course-loader',
  templateUrl: './info-course-loader.component.html',
  styleUrls: ['./info-course-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoCourseLoaderComponent implements OnInit {

public fileLoaderManual: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public fileLoaderExersices: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public fileLoaderAnswers: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public fileLoaderExam: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public openCourse: IgucaCourse = new IgucaCourse();
private database: Database = new Database(this.db);
expireDate: Date;

examFile: FileItem;
manualFile: FileItem;
exerciseFile: FileItem;
answersFile: FileItem;

public isNewCourse: boolean;
public urlAnswers = '';
public urlExersices = '';
public urlExam = '';
public urlManual = '';

public statusText = [];
public editCourseNumber;

constructor(private igucaService: IgucaService,
  private db: AngularFireDatabase,
  private afStorage: AngularFireStorage,
  public dialogRef: MatDialogRef<InfoCourseLoaderComponent>,
  @Inject(FirebaseApp) firebaseApp: any,
  @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data.course) {
      this.openCourse = this.data.course;
    }
    this.isNewCourse = this.data.isNewCourse;
    this.editCourseNumber = this.data.editCourseNumber;
  }

  ngOnInit() {
    if (!this.isNewCourse) {
      this.reBuildExpireDate();
      this.database.chargedCourses.subscribe((data) => {
        this.getStorageUrl();
      });
    }
    if (!this.openCourse.finalExam) {
      this.openCourse.finalExam = [];
    }
    if (this.isNewCourse) {
      this.pushQuestion();
    }

    this.fileLoaderManual.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'manual';
      this.manualFile = item;
    };

    this.fileLoaderExersices.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'exersices';
      this.exerciseFile = item;
    };

    this.fileLoaderExam.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'exam';
      this.examFile = item;
    };

    this.fileLoaderAnswers.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'answers';
      this.answersFile = item;
    };

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildExpireDate() {
    this.openCourse.expireDate = this.expireDate.getTime();
  }

  deleteQuestion(question: IgucaQuestion) {
    this.openCourse.finalExam = this.openCourse.finalExam.filter((question_) => {
      return question_ !== question;
    });
    this.resetNumbers();
  }

  deleteManual(file) {
    this.fileLoaderManual.queue = this.fileLoaderManual.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  deleteExercise(file) {
    this.fileLoaderExersices.queue = this.fileLoaderExersices.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  deleteExam(file) {
    this.fileLoaderExam.queue = this.fileLoaderExam.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  deleteAnswers(file) {
    this.fileLoaderAnswers.queue = this.fileLoaderAnswers.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  getStorageUrl() {
    const URL_ref_Manual = this.afStorage.ref(this.database.coursesKeys[this.editCourseNumber]).child('Manual');
    URL_ref_Manual.getDownloadURL().subscribe(url => this.urlManual = url);

    const URL_ref_Exersices = this.afStorage.ref(this.database.coursesKeys[this.editCourseNumber]).child('Ejercicios');
    URL_ref_Exersices.getDownloadURL().subscribe(url => this.urlExersices = url);

    const URL_ref_Answers = this.afStorage.ref(this.database.coursesKeys[this.editCourseNumber]).child('Respuestas');
    URL_ref_Answers.getDownloadURL().subscribe(url => this.urlAnswers = url);

    const URL_ref_Exam = this.afStorage.ref(this.database.coursesKeys[this.editCourseNumber]).child('Examen');
    URL_ref_Exam.getDownloadURL().subscribe(url => this.urlExam = url);
  }


  isCorrect(choice: string, question: IgucaQuestion) {
    if (question.correct === choice) {
      return  true;
    } else {
      return false;
    }
  }

  pushQuestion() {
    const newQuestion: IgucaQuestion = new IgucaQuestion();
    newQuestion.number = this.openCourse.finalExam.length + 1;
    this.openCourse.finalExam.push(newQuestion);
  }

  setCorrectAnswer(value: string, question: IgucaQuestion) {
    question.correct = value;
  }

  resetNumbers() {
    let i = 1;
    this.openCourse.finalExam.forEach((question) => {
      question.number = i;
      i += 1;
    });
  }

  reBuildExpireDate() {
    this.expireDate = new Date();
    this.expireDate.setTime(this.openCourse.expireDate);
  }

  sendCourse() {
    if (this.validateCourse()) {
      if (this.isNewCourse) {
        this.buildExpireDate();
        const key = this.database.addCourse(this.openCourse);
        this.uploadFile(this.manualFile, 'Manual', key);
        this.uploadFile(this.exerciseFile , 'Ejercicios', key);
        this.uploadFile(this.examFile , 'Examen', key);
        this.uploadFile(this.answersFile, 'Respuestas', key);
        this.dialogRef.close(this.openCourse);
      }
    }
  }

  updateFile(item: FileItem, file: string) {
    try {
      const task = this.afStorage.ref(this.database.coursesKeys[this.editCourseNumber]).child(file).delete();
    } catch (e) {
      console.log(e);
    }
    this.uploadFile(item, file , this.database.coursesKeys[this.editCourseNumber]);
  }

  updateCourse() {
    if (this.validateCourse()) {
      this.buildExpireDate();
      this.database.updateCourse( this.openCourse, this.database.coursesKeys[this.editCourseNumber]);
      if (this.manualFile) {
        this.updateFile(this.manualFile, 'Manual');
      }
      if (this.exerciseFile) {
        this.updateFile(this.exerciseFile, 'Ejercicios');
      }
      if (this.examFile) {
        this.updateFile(this.examFile, 'Examen');
      }
      if (this.answersFile) {
        this.updateFile(this.answersFile, 'Respuestas');
      }
      this.dialogRef.close(this.openCourse);
    }
  }


  uploadFile(item: FileItem, file: string, key: string) {
    try {
      const task = this.afStorage.ref( key).child(file).put(item.file.rawFile);
    } catch (e) {
      console.log(e);
    }
  }

  validateCourse(): boolean {
    this.statusText = [];
    let isValid = true;
    if (this.openCourse.name === '') {
      this.statusText.push('Falta agregar el nombre del curso');
      isValid = false;
    }
    // TODO: validacion documentos
    if (this.isNewCourse) {
      if (!this.manualFile) {
        isValid = false;
        this.statusText.push('Falta manual');
      }
      if (!this.exerciseFile) {
        isValid = false;
        this.statusText.push('Falta Ejercicos');
      }
      if (!this.examFile) {
        isValid = false;
        this.statusText.push('Falta Examen');
      }
      if (!this.answersFile) {
        isValid = false;
        this.statusText.push('Faltan Respuestas');
      }
    }
    if (this.openCourse.finalExam.length === 0) {
      this.statusText.push('Falta agregar al menos una pregunta');
      isValid = false;
    }
    this.openCourse.finalExam.forEach((question) => {
      if (question.question === '') {
        this.statusText.push('Alguna pregunta no tiene enunciado');
        isValid = false;
      }
      if (question.correct === '') {
        this.statusText.push('Alguna pregunta no tiene respuesta correcta');
        isValid = false;
      }

      if (question.a === '') {
        this.statusText.push('Las preguntas deben tener al menos 2 alternativas ( a y b )');
        isValid = false;
      }
      if (question.b === '') {
        this.statusText.push('Las preguntas deben tener al menos 2 alternativas (a y b )');
        isValid = false;
      }
    });
    return isValid;
  }

}
