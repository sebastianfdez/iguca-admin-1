import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLoaderComponent } from './course-loader.component';

describe('CourseLoaderComponent', () => {
  let component: CourseLoaderComponent;
  let fixture: ComponentFixture<CourseLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
