import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef,
   OnInit, ComponentFactory } from '@angular/core';
import { InfoCourseLoaderComponent} from './info-course-loader/info-course-loader.component';
import { ExistingCoursesComponent } from './existing-courses/existing-courses.component';
import { IgucaService } from './services/iguca-service.service';
import { IgucaCourse } from './course';

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
  private courseLoaderHolder: ComponentFactory<InfoCourseLoaderComponent>;
  private existingCoursesHolder: ComponentFactory<ExistingCoursesComponent>;

  private courseLoaderHolderComp;
  private existingCoursesHolderComp;


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  private allIgucaCourses: IgucaCourse[] = [];
  public childOpen = false;
  public igucaLogo = '../../assets/Logoconfondoblanco.jpg';

  constructor(
    private factory: ComponentFactoryResolver,
    private igucaService: IgucaService,
  ) {
  }

  ngOnInit() {
    this.igucaService.courseCreatedObs$.subscribe((newCourse: IgucaCourse) => {
      this.allIgucaCourses.push(newCourse);
      console.log(this.allIgucaCourses);
      this.courseLoaderHolderComp.destroy();
      this.childOpen = false;
    });
  }

  openInfoCourseLoader() {
    this.courseLoaderHolder = this.factory.resolveComponentFactory(InfoCourseLoaderComponent);
    this.courseLoaderHolderComp = this.parent.createComponent(this.courseLoaderHolder);
    this.childOpen = true;
  }

  showNewCourse() {
    this.openInfoCourseLoader();
  }

  openExistingCourses() {
    this.existingCoursesHolder = this.factory.resolveComponentFactory(ExistingCoursesComponent);
    this.existingCoursesHolderComp = this.parent.createComponent(this.existingCoursesHolder);
    this.childOpen = true;
  }

  showExistingCourses() {
    this.openExistingCourses();
  }

}
