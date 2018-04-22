import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration'; 
import { CourseApplyDetailPage } from '../../pages/course-apply-detail/course-apply-detail';
/**
 * Generated class for the CourseApplyHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-apply-history',
  templateUrl: 'course-apply-history.html',
})
export class CourseApplyHistoryPage {

 course :any;
    noteList = [];
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/getNotificationsByCId/' + Configuration.COURSE_APPLY_TYPE,'get',{cId:this.course.cId}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.noteList = result.extend.notes;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryNotificationPage');
    }
    checkDetail(note:any){
        this.navCtrl.push(CourseApplyDetailPage,{course:this.course,notification:note})
    }

}
