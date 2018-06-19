import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// database
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { CourseLoaderComponent } from './course-loader/course-loader.component';
// material packages
import { MatInputModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfoCourseLoaderComponent } from './info-course-loader/info-course-loader.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    CourseLoaderComponent,
    InfoCourseLoaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebase, 'igucaAdmin'),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CourseLoaderComponent, InfoCourseLoaderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
