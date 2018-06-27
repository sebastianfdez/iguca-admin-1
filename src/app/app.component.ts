import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef,
   OnInit, ComponentFactory } from '@angular/core';
import { InfoCourseLoaderComponent} from './info-course-loader/info-course-loader.component';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { IgucaService } from './services/iguca-service.service';
import { IgucaCourse } from './course';
import { MatDialog } from '@angular/material';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { ExistingCompaniesComponent } from './existing-companies/existing-companies.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';

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
  private loginHolder: ComponentFactory<LoginComponent>;
  private componentHolders = [];


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  private allIgucaCourses: IgucaCourse[] = [];
  public igucaLogo = '../../assets/Logoconfondoblanco.jpg';

  constructor(
    private factory: ComponentFactoryResolver,
    private igucaService: IgucaService,
    private dialog: MatDialog,
    private afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.igucaService.closeEditCourses$.subscribe((data) => {
      this.destroyComponents();
    });
    this.igucaService.closeEditCompany$.subscribe((data) => {
      this.destroyComponents();
    });
    this.igucaService.loggedUser$.subscribe((data) => {
      console.log('entroooo');
      this.destroyComponents();
    });
    if (!this.afAuth.auth.currentUser) {
      this.openLogin();
    }
  }

  destroyComponents() {
    this.componentHolders.forEach(c => c.destroy());
    this.componentHolders = [];
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.openLogin();
    }).catch((error) => {
      console.log(error);
    });
  }

  openLogin() {
    this.loginHolder = this.factory.resolveComponentFactory(LoginComponent);
    this.componentHolders.push(this.parent.createComponent(this.loginHolder));
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
    this.componentHolders.push(this.parent.createComponent(this.existingCoursesHolder));
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
    this.componentHolders.push(this.parent.createComponent(this.existingCompaniesHolder));
  }

}
