import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  courses: any = [];
  allAuthors: any = [];
  editable = "true";
  constructor(@Inject(CoursesService) private courseService: CoursesService) {}
  ngOnInit() {
    this.loadCourseTitlesAndAuthors();
  }
  loadCourseTitlesAndAuthors() {
    this.courses = this.courseService.getAll().courses;
    this.allAuthors = this.courseService.getAll().authors;
  }
  getAuthorNames(authorList: string[]) {
    return authorList
      .map((authorId: any) =>
        this.allAuthors.find((author: any) => author.id === authorId)
      )
      .map((author: any) => author?.name)
      .join(", ");
  }
}
