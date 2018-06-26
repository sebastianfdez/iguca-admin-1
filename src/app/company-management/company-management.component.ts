import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IgucaService } from '../services/iguca-service.service';
import { Database, IgucaCourse, IgucaQuestion, IgucaCompany } from '../course';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyManagementComponent implements OnInit {
  IgucaCompanies: IgucaCompany[] = [];
  database: Database = new Database(this.db);
  IgucaCourses = [];
  public companies;
  private Courses: any[];
  public openCompany: IgucaCompany = new IgucaCompany();

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.openCompany.courses.push('');
  }

  addCourse() {
    this.openCompany.courses.push('');
  }

  deleteCourse(course: string) {
    this.openCompany.courses = this.openCompany.courses.filter((course_) => {
      return course_ !== course;
    });
  }

  getDatabaseCompanies() {
    this.companies = this.database.getComapny();

    for (let _i = 0; _i < this.companies.length ; _i++) {
      this.IgucaCompanies[_i] = new IgucaCompany();
      this.IgucaCompanies[_i].name = this.companies[_i].name;
      this.IgucaCompanies[_i].courses = this.companies[_i].courses;
      this.IgucaCompanies[_i]._id = this.companies[_i]._id;
    }
    console.log(this.companies);
    console.log(this.IgucaCompanies);
  }

  getDatabaseCoursesName() {
    if (this.database.coursesCharged) {
      this.Courses = this.database.getElement();
      for (let _i = 0; _i < this.Courses.length ; _i++) {
        this.IgucaCourses[_i] = this.Courses[_i].name;
      }
      console.log(this.IgucaCourses);
    }
  }

  showCompany() {
    console.log(this.openCompany);
    this.database.addCompany(this.openCompany);
  }

}
