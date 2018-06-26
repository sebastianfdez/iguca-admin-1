import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef,
   OnInit, ComponentFactory } from '@angular/core';
import { InfoCourseLoaderComponent} from './info-course-loader/info-course-loader.component';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { IgucaService } from './services/iguca-service.service';
import { IgucaCourse } from './course';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from './company-management/company-management.component';

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
  private companyManagementHolder: ComponentFactory<CompanyManagementComponent>;
  private existingCoursesHolderComp;
  private companyManagementHolderComp;


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
    this.companyManagementHolder = this.factory.resolveComponentFactory(CompanyManagementComponent);
    this.companyManagementHolderComp = this.parent.createComponent(this.companyManagementHolder);
    this.childOpen = true;
  }

}
