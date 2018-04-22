import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNotificationPage } from './new-notification';

@NgModule({
  declarations: [
    NewNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewNotificationPage),
  ],
})
export class NewNotificationPageModule {}
