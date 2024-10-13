import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
})
export class CoursesListComponent {
  @Input() courses: any = [];
  @Input() allAuthors: any = [];
  @Input() editable = false;
}
