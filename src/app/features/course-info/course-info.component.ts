import { Component, Input } from "@angular/core";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course: any = [];
  title!: string;
  description!: string;
  id!: string;
  duration!: number;
  creationDate!: Date;
  authors!: string[];

  getTitle() {
    return (this.title = this.course.title);
  }
  getDescription() {
    return (this.description = this.course.description);
  }
  getId() {
    return (this.id = this.course.id);
  }
  getDuration() {
    return (this.duration = this.course.duration);
  }
  getCreationDate() {
    return (this.creationDate = this.course.creationDate);
  }
  getAuthors() {
    return (this.authors = this.course.authors);
  }
}
