import { Component ,ChangeDetectorRef,ViewRef} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,Events} from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { PublishQuestionPage } from '../../pages/publish-question/publish-question';
import { StorageService } from '../../service/storage.service';
/**
 * Generated class for the CourseQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-question',
  templateUrl: 'course-question.html',
})
export class CourseQuestionPage {
    user:any;
    questions = [];
    course:any;
    constructor(public storage:StorageService,public alert:AlertController,public changeDetector:ChangeDetectorRef,public events:Events,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        //this.user = this.navParams.get('user');
        this.course = this.navParams.get('course');
        this.storage.read('user').then(user=>{
            this.user = JSON.parse(user);
        }).then(()=>{
            this.http.request('question/all','get',{tId:this.user.tId}).then((result)=>{
                if(result.code == Configuration.SUCCESS)
                    this.questions = result.extend.questions;
            });
        })
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad CourseQuestionPage');
    }
    getSimpleContent(content:string){
        if(content == undefined) return;
        if(content.length < 58) return content;
        return content.substr(0,58) + '...';
    }
    getQType(q:any){
        if(q.type == Configuration.QUESTION_CHOOSE_TYPE)
            return '选择题';
        else
            return '填空题';
    }
    goPublishQuestionPage(q:any){
        this.navCtrl.push(PublishQuestionPage,{question:q,course:this.course});
    }
}
