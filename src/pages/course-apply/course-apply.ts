import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../service/storage.service';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the CourseApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-apply',
  templateUrl: 'course-apply.html',
})
export class CourseApplyPage {
    course:any;
    day:number;
    place:string;
    time:string;
    applyContent='';
    user:any;
    days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    values = [0,1,2,3,4,5,6];
    constructor(public note:NoticeProvider,public http:HttpService,public storage:StorageService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.storage.read('user').then(user=>{
            this.user = JSON.parse(user);
        });  
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CourseApplyPage');
    }
    
    apply(){
        this.http.request('teacher/courseApply','post',{cId:this.course.cId,tId:this.user.tId,day:this.day,place:this.place,time:this.time,content:this.applyContent}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.note.showToast('预约成功！');
                this.navCtrl.pop();
            }
        })

        
    }

}
