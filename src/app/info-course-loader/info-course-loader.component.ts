import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { IgucaCourse, IgucaQuestion } from '../course';
import { IgucaService } from '../services/iguca-service.service';

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

public newCourse: IgucaCourse = new IgucaCourse();

public statusText = [];

constructor(private igucaService: IgucaService) {
}
  ngOnInit() {
    this.pushQuestion();

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'doc';
     // item.upload();
      console.log(item);
    };
  }

  pushQuestion() {
    const newQuestion: IgucaQuestion = new IgucaQuestion();
    newQuestion.number = this.newCourse.finalExam.length + 1;
    this.newCourse.finalExam.push(newQuestion);
    console.log(this.newCourse);
  }

  deleteQuestion(question: IgucaQuestion) {
    this.newCourse.finalExam = this.newCourse.finalExam.filter((question_) => {
      return question_ !== question;
    });
    this.resetNumbers();
  }



  setCorrectAnswer(value: string, question: IgucaQuestion) {
    question.correct = value;
  }

  resetNumbers() {
    let i = 1;
    this.newCourse.finalExam.forEach((question) => {
      question.number = i;
      i += 1;
    });
  }

  sendCourse() {
    if (this.validateCourse()) {
      this.igucaService.newCourseCreated(this.newCourse);
    }
  }

  validateCourse(): boolean {
    this.statusText = [];
    let isValid = true;
    if (this.newCourse.name === '') {
      this.statusText.push('Falta agregar el nombre del curso');
      isValid = false;
    }
    if (this.newCourse.company === '') {
      this.statusText.push('Falta agregar el nombre de la compania');
      isValid = false;
    }
    /*if (this.newCourse.documents.length === 0) {
      this.statusText = 'Falta agregar al menos un documentos';
      isValid = false;
    }*/
    if (this.newCourse.finalExam.length === 0) {
      this.statusText.push('Falta agregar al menos una pregunta');
      isValid = false;
    }
    this.newCourse.finalExam.forEach((question) => {
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

}
