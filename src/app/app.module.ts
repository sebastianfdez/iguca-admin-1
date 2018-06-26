import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// database
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';



import { AppComponent } from './app.component';
// material packages
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfoCourseLoaderComponent } from './info-course-loader/info-course-loader.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { IgucaService } from './services/iguca-service.service';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { CompanyManagementComponent } from './company-management/company-management.component';



@NgModule({
  declarations: [
    AppComponent,
    InfoCourseLoaderComponent,
    ExistingCoursesComponent,
    CompanyManagementComponent,
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
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase, 'igucaAdmin'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [IgucaService ],
  bootstrap: [AppComponent],
  entryComponents: [InfoCourseLoaderComponent, ExistingCoursesComponent, CompanyManagementComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
