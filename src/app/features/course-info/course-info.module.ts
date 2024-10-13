import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseInfoComponent } from "./course-info.component";
const components = [CourseInfoComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule],
  exports: [components],
})
export class CourseInfoModule {}
