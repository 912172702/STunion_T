import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseQuestionPage } from './course-question';

@NgModule({
  declarations: [
    CourseQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseQuestionPage),
  ],
})
export class CourseQuestionPageModule {}
