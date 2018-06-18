import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

const URL = ''; // aca debe ir la ruta donde los archivos llegan (conectar con la base de datos)



@Component({
  selector: 'app-info-course-loader',
  templateUrl: './info-course-loader.component.html',
  styleUrls: ['./info-course-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoCourseLoaderComponent implements OnInit {

public uploader: FileUploader = new FileUploader({url: URL});



  constructor() { }

  ngOnInit() {
  }

}
