import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
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

public uploader: FileUploader = new FileUploader({url: URL});
public uploader2: FileUploader = new FileUploader({url: URL});

public newCourse: IgucaCourse = new IgucaCourse();

public statusText = '';

constructor(private igucaService: IgucaService) {
}
  ngOnInit() {
    this.pushQuestion();
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
      this.statusText = 'Curso Valido';
    }
  }

  validateCourse(): boolean {
    let isValid = true;
    if (this.newCourse.name === '') {
      this.statusText = 'Falta agregar el nombre del curso';
      isValid = false;
    }
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
