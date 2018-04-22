import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration'; 
import { NoteDetailPage } from '../../pages/note-detail/note-detail';
/**
 * Generated class for the HistoryNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-notification',
  templateUrl: 'history-notification.html',
})
export class HistoryNotificationPage {
    course :any;
    noteList = [];
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/getNotificationsByCId/' + Configuration.NORMAL_NOTIFICATION_TYPE,'get',{cId:this.course.cId}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.noteList = result.extend.notes;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryNotificationPage');
    }
    checkDetail(note:any){
        this.navCtrl.push(NoteDetailPage,{course:this.course,notification:note})
    }

}
