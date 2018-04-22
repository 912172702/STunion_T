import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../service/storage.service'; 
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { NoticeProvider } from  '../../providers/notice/notice';
/**
 * Generated class for the NewNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-notification',
  templateUrl: 'new-notification.html',
})
export class NewNotificationPage {
    user:any;
    course:any;
    noteContent = '';
    constructor(public note:NoticeProvider,public http:HttpService,public storage:StorageService,public navCtrl: NavController, public navParams: NavParams) {
        this.storage.read('user').then(user=>{
            this.user = JSON.parse(user);
        })
        this.course = navParams.get('course');
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad NewNotificationPage');
    }
    getUserName(){
        if(this.user != undefined)
            return this.user.tName;
    }
    submit(){
        this.http.request('teacher/notification','post',{tId:this.user.tId,cId:this.course.cId,content:this.noteContent}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.note.showToast('通知已送达！您可在通知历史中查看。');
                this.navCtrl.pop();
            }
        });
    }
}
