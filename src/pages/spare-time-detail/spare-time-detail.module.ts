import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpareTimeDetailPage } from './spare-time-detail';

@NgModule({
  declarations: [
    SpareTimeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SpareTimeDetailPage),
  ],
})
export class SpareTimeDetailPageModule {}
