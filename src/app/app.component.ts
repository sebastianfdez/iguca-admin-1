import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef,
   OnInit, ComponentFactory } from '@angular/core';
import { InfoCourseLoaderComponent} from './info-course-loader/info-course-loader.component';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { IgucaService } from './services/iguca-service.service';
import { IgucaCourse } from './course';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { ExistingCompaniesComponent } from './existing-companies/existing-companies.component';

// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/database';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
  titleHerma = 'hermano';

  private existingCoursesHolder: ComponentFactory<ExistingCoursesComponent>;
  private existingCompaniesHolder: ComponentFactory<ExistingCompaniesComponent>;
  private existingCoursesHolderComp;
  private existingCompaniesHolderComp;


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  private allIgucaCourses: IgucaCourse[] = [];
  public childOpen = false;
  public igucaLogo = '../../assets/Logoconfondoblanco.jpg';

  constructor(
    private factory: ComponentFactoryResolver,
    private igucaService: IgucaService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.igucaService.closeEditCourses$.subscribe((data) => {
      this.existingCoursesHolderComp.destroy();
      this.childOpen = false;
    });

    this.igucaService.closeEditCompany$.subscribe((data) => {
      this.existingCompaniesHolderComp.destroy();
      this.childOpen = false;
    });

  }

  showNewCourse() {
    const dialogRef = this.dialog.open(InfoCourseLoaderComponent, {
      width: '1000px',
      data: {
        course: null,
        isNewCourse: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  openExistingCourses() {
    this.existingCoursesHolder = this.factory.resolveComponentFactory(ExistingCoursesComponent);
    this.existingCoursesHolderComp = this.parent.createComponent(this.existingCoursesHolder);
    this.childOpen = true;
  }

  showExistingCourses() {
    this.openExistingCourses();
  }

  showCompanyManagement() {
    const dialogRef = this.dialog.open(CompanyManagementComponent, {
      width: '1000px',
      data: {
        company: null,
        isNewCompany: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  showExistingCompanies() {
    this.existingCompaniesHolder = this.factory.resolveComponentFactory(ExistingCompaniesComponent);
    this.existingCompaniesHolderComp = this.parent.createComponent(this.existingCompaniesHolder);
    this.childOpen = true;
  }

}
