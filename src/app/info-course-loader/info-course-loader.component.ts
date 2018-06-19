import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Course } from './course.ts';

const URL = ''; // aca debe ir la ruta donde los archivos llegan (conectar con la base de datos)




@Component({
  selector: 'app-info-course-loader',
  templateUrl: './info-course-loader.component.html',
  styleUrls: ['./info-course-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoCourseLoaderComponent implements OnInit {
public uploader: FileUploader = new FileUploader({url: URL});

public courseName = '';
public mainQuestion = '';
public aChoiceAnswer = '';
public bChoiceAnswer = '';
public cChoiceAnswer = '';
public dChoiceAnswer = '';
public correctAnswer = '';

  const model = new Course();

constructor() {
}
   ngOnInit() {
  }

  pushQuestion() {
    this.model.addQuestion([ this.mainQuestion, this.aChoiceAnswer
      , this.bChoiceAnswer , this.cChoiceAnswer , this.dChoiceAnswer , this.correctAnswer ]);
  }

  deleteQuestion(position: number) {
    console.log('eliminar');
    this.model.deleteQuestion(position);
  }
  setCorrectAnswer(value: String) {
    this.correctAnswer = value;
    console.log(this.correctAnswer);
  }


}
