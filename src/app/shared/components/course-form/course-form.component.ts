import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(2)]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    author: new FormControl("", [
      Validators.minLength(2),
      Validators.pattern("^[A-Za-z\\s]+$"),
    ]),
    duration: new FormControl("", [Validators.required, Validators.min(0)]),
  });
  authors: string[] = [];
  courseAuthors: string[] = [];
  submitted = false;

  onCreateAuthor() {
    if (this.courseForm.get("author")?.valid) {
      this.authors.push(this.courseForm.get("author")?.value);
      this.courseForm.get("author")?.reset();
    }
  }

  onAddAuthor(author: string) {
    this.courseAuthors.push(author);
    this.authors = this.authors.filter((authorName) => authorName !== author);
  }

  onDeleteAuthor(author: string, type?: string) {
    if (type === "list") {
      this.authors = this.authors.filter((authorName) => authorName !== author);
    } else {
      this.courseAuthors = this.courseAuthors.filter(
        (authorName) => authorName !== author
      );
      this.authors.push(author);
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.courseForm.valid, this.authors);
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
