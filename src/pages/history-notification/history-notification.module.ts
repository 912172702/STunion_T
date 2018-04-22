import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryNotificationPage } from './history-notification';

@NgModule({
  declarations: [
    HistoryNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryNotificationPage),
  ],
})
export class HistoryNotificationPageModule {}
