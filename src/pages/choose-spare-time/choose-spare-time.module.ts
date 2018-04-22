import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseSpareTimePage } from './choose-spare-time';

@NgModule({
  declarations: [
    ChooseSpareTimePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseSpareTimePage),
  ],
})
export class ChooseSpareTimePageModule {}
