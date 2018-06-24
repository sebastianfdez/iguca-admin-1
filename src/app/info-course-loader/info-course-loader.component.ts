import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { IgucaCourse, IgucaQuestion, Database } from '../course';
import { IgucaService } from '../services/iguca-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


const URL = ''; // aca debe ir la ruta donde los archivos llegan (conectar con la base de datos)

@Component({
  selector: 'app-info-course-loader',
  templateUrl: './info-course-loader.component.html',
  styleUrls: ['./info-course-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoCourseLoaderComponent implements OnInit {

public uploader: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public uploader2: FileUploader = new FileUploader({
  url: URL,
  allowedFileType: ['pdf']
});

public openCourse: IgucaCourse = new IgucaCourse();
private database: Database = new Database(this.db);

public isNewCourse: boolean;

public statusText = [];

constructor(private igucaService: IgucaService,
  private db: AngularFireDatabase, public dialogRef: MatDialogRef<InfoCourseLoaderComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    if (this.data.course) {
      this.openCourse = this.data.course;
    }
    this.isNewCourse = this.data.isNewCourse;
}
  ngOnInit() {
    if (!this.openCourse.finalExam) {
      this.openCourse.finalExam = [];
    }
    if (this.isNewCourse) {
      this.pushQuestion();
    }

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'doc';
     // item.upload();
      console.log(item);
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteQuestion(question: IgucaQuestion) {
    this.openCourse.finalExam = this.openCourse.finalExam.filter((question_) => {
      return question_ !== question;
    });
    this.resetNumbers();
  }

  deleteManual(file) {
    this.uploader.queue = this.uploader.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  deleteExercise(file) {
    this.uploader2.queue = this.uploader.queue.filter((file_) => {
      return file_ !== file;
    });
  }

  isCorrect(choice: string, question: IgucaQuestion) {
    if (question.correct === choice) {
      return  true;
    } else {
      return false;
    }
    console.log(question.correct);
  }

  pushQuestion() {
    const newQuestion: IgucaQuestion = new IgucaQuestion();
    newQuestion.number = this.openCourse.finalExam.length + 1;
    this.openCourse.finalExam.push(newQuestion);
  }

  setCorrectAnswer(value: string, question: IgucaQuestion) {
    question.correct = value;
  }

  updateCourse() {
    if (this.validateCourse()) {
    this.database.updateElement(this.openCourse);
    this.dialogRef.close(this.openCourse);
    }
  }

  resetNumbers() {
    let i = 1;
    this.openCourse.finalExam.forEach((question) => {
      question.number = i;
      i += 1;
    });
  }

  sendCourse() {
    if (this.validateCourse()) {
      console.log(this.isNewCourse);
      if (this.isNewCourse) {
        this.database.addElement(this.openCourse);
      }
      this.dialogRef.close(this.openCourse);
    }
  }

  validateCourse(): boolean {
    this.statusText = [];
    let isValid = true;
    if (this.openCourse.name === '') {
      this.statusText.push('Falta agregar el nombre del curso');
      isValid = false;
    }
    if (this.openCourse.company === '') {
      this.statusText.push('Falta agregar el nombre de la compania');
      isValid = false;
    }
    /*if (this.openCourse.documents.length === 0) {
      this.statusText = 'Falta agregar al menos un documentos';
      isValid = false;
    }*/
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
