import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionRecordPage } from './question-record';

@NgModule({
  declarations: [
    QuestionRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionRecordPage),
  ],
})
export class QuestionRecordPageModule {}
