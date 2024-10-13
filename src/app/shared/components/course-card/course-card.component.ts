import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate!: Date;
  @Input() duration: number = +"";
  @Input() authors: string[] = [];
  @Input() allAuthors: any[] = [];
  @Input() courseId: string = "";
  authorsName = "";

  @Input() editable = false;
  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  onShowCourse() {
    this.showCourse.emit({
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      duration: this.duration,
      authors: this.authorsName,
      id: this.courseId,
    });
  }
  getAuthorNames(authorList: string[]) {
    this.authorsName = authorList
      .map((authorId: string) =>
        this.allAuthors.find((author: any) => author.id === authorId)
      )
      .map((author: any) => author?.name)
      .filter((name: string | undefined) => name !== undefined)
      .join(", ");
    return this.authorsName;
  }
}
