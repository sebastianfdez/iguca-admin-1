import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { CourseLoaderComponent } from './course-loader/course-loader.component';
import { InfoCourseLoaderComponent} from './info-course-loader/info-course-loader.component';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/database';
import { Observable } from 'rxjs/';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
  titleHerma = 'hermano';
  private courseLoaderHolder;

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  constructor(
    private factory: ComponentFactoryResolver,
  ) {
  }

  ngOnInit() {
    this.openInfoCourseLoader();
  }

  openCourseLoader() {
    this.courseLoaderHolder = this.factory.resolveComponentFactory(CourseLoaderComponent);
    this.parent.createComponent(this.courseLoaderHolder);
  }

  openInfoCourseLoader() {
    this.courseLoaderHolder = this.factory.resolveComponentFactory(InfoCourseLoaderComponent);
    this.parent.createComponent(this.courseLoaderHolder);

  }


}
