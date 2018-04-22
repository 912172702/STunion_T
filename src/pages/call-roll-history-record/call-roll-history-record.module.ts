import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallRollHistoryRecordPage } from './call-roll-history-record';

@NgModule({
  declarations: [
    CallRollHistoryRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CallRollHistoryRecordPage),
  ],
})
export class CallRollHistoryRecordPageModule {}
