import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
      course:any;
      notification:any;
      constructor(public navCtrl: NavController, public navParams: NavParams) {
          this.course = this.navParams.get('course');
          this.notification = this.navParams.get('notification');
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad NoteDetailPage');
      }

}
