import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallRollRecordPage } from './call-roll-record';

@NgModule({
  declarations: [
    CallRollRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CallRollRecordPage),
  ],
})
export class CallRollRecordPageModule {}
