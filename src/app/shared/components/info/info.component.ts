import { Component, Input } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  @Input() title?: string = "Your List Is Empty";
  @Input() text?: string =
    "Please use 'Add new Course' button to add your first course";
}
// Use the names `title` and `text`.
