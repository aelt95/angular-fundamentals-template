import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  courses: any = [];
  allAuthors: any = [];
  constructor(@Inject(CoursesService) private courseService: CoursesService) {}
  ngOnInit() {
    this.loadCourseTitlesAndAuthors();
  }

  loadCourseTitlesAndAuthors() {
    this.courses = this.courseService.getAll().courses;
    this.allAuthors = this.courseService.getAll().authors;
  }
  getAuthorNames(prop: any) {
    // Assuming course.authors is an array of author IDs
    return prop
      .map((authorId: any) =>
        this.allAuthors.find((author: any) => author.id === authorId)
      )
      .map((author: any) => author?.name) // Use optional chaining
      .join(", "); // Join names with commas
  }

  title: string = "";
  description: string = "";
  creationDate!: Date;
  duration: number = +"";
  authors: string[] = [];

  @Input() editable = false;
  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();
}
