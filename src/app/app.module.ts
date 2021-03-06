import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Database
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { ExcelExportModule } from '@progress/kendo-angular-excel-export';


// Material Packages
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';





// Components
import { InfoCourseLoaderComponent } from './info-course-loader/info-course-loader.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { IgucaService } from './services/iguca-service.service';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { ExistingCompaniesComponent } from './existing-companies/existing-companies.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { WarningComponent } from './warning/warning.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoCourseLoaderComponent,
    ExistingCoursesComponent,
    CompanyManagementComponent,
    ExistingCompaniesComponent,
    LoginComponent,
    WarningComponent,
    ReportsComponent,
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
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase, 'igucaAdmin'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ExcelExportModule,
  ],
  providers: [IgucaService, AngularFireAuth ],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoCourseLoaderComponent,
    ExistingCoursesComponent,
    CompanyManagementComponent,
    ExistingCompaniesComponent,
    LoginComponent,
    WarningComponent,
    ReportsComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
