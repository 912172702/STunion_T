import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallRollHistoryPage } from './call-roll-history';

@NgModule({
  declarations: [
    CallRollHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CallRollHistoryPage),
  ],
})
export class CallRollHistoryPageModule {}
