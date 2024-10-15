import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      return this.registrationForm.value;
    }
    return;
  }
  // Use the names `name`, `email`, `password` for the form controls.
}
