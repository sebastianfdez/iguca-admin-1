import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCourseLoaderComponent } from './info-course-loader.component';

describe('InfoCourseLoaderComponent', () => {
  let component: InfoCourseLoaderComponent;
  let fixture: ComponentFixture<InfoCourseLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCourseLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCourseLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
