import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { StorageService } from '../../service/storage.service';
import { Events } from 'ionic-angular';
import { JoinCoursePage } from '../../pages/join-course/join-course';
import { GroupManagePage } from '../../pages/group-manage/group-manage';
import { NoticeProvider } from '../../providers/notice/notice';
import { CallRollRecordPage } from '../../pages/call-roll-record/call-roll-record';
import { SpareTimeDetailPage } from '../../pages/spare-time-detail/spare-time-detail';
import { QuestionRecordPage } from '../../pages/question-record/question-record';
/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
    title:string;
    course:any;
    comeStudents = [];
    user:any;
    showCallBackNote = false;
    showSpareTimeNote = false;
    callBackSeconds = 0;
    studentsCnt = 0;
    calledCnt = 0;
    calledStudents = [];
    showQuestionNote = false;
    question:any;
    answerArray = [];
    answerCounter = [];
    constructor(public note:NoticeProvider,public popover:PopoverController,public events:Events,public storage:StorageService,public http:HttpService,public platform:Platform,public geolocation:Geolocation,public navCtrl: NavController, public navParams: NavParams) {
        this.course = navParams.get('course');
        this.title = this.course.cName;
        this.events.subscribe(Configuration.SIMPLE_CALL_ROLL_EVENT,(data)=>{
            this.callBackSeconds = data.time;
            this.studentsCnt = data.count;
            this.showCallRollBar();
        });
        this.events.subscribe(Configuration.STUDENT_CALL_ROLL_EVENT,(data)=>{
            console.log(JSON.stringify(data));
            if(data.cId != this.course.cId) return;
            this.calledStudents.push(data.student);
            this.calledCnt++;
        });
        this.events.subscribe(Configuration.SPARE_TIME_EVENT,(data)=>{
            if(data.cId != this.course.cId)return;
            this.showSpareTimeNote = true;
        });
        this.events.subscribe(Configuration.QUESTION_PUBLISH_EVENT,(data)=>{
            if(data.cId != this.course.cId)return;
            this.question = data.question;
            this.setAnswerList();
            this.studentsCnt = data.studentsCnt;
            this.setAnswerCounter();
            this.showQuestionNote = true;
        });
        this.events.subscribe(Configuration.STUDENT_CHOOSE_ANSWER_EVENT,(data)=>{
             if(data.cId != this.course.cId)return;
             let stuAnswer:string = data.answer;
             let answerIndex = stuAnswer.charCodeAt(0) - 65;
             if(answerIndex >= 0 && answerIndex <this.answerCounter.length)
             this.answerCounter[answerIndex]++;
        });
    }

    faceToFace(){
        this.platform.ready().then(()=>{
            console.log('计算经纬度...');
            let latitude :number;//纬度
            let longitude:number;//经度
            this.geolocation.getCurrentPosition().then(pos=>{
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
                console.log('经纬度：('+longitude+',' + latitude+')');
                this.storage.read('user').then(userJson=>JSON.parse(userJson)).then(user =>{
                    this.user = user;
                    this.http.request('course/faceToFace/t','post',{'tId':+user.tId,'tTel':user.tTel,'cId':+this.course.cId,'longitude':+longitude,'latitude':+latitude}).then(result=>{
                        if(result.code == Configuration.SUCCESS){
                            let code:string = result.extend.code; 
                            return code;
                        }else{
                            console.log('error:'+result.msg);
                        }
                    }).then(code=>{
                        let pop = this.popover.create(JoinCoursePage,{'code':code,'tId':+this.user.tId},{
                            enableBackdropDismiss:false
                        });
                        pop.present();
                    });
                });
            }).catch(err=>console.log('经纬度获取失败：'+JSON.stringify(err)));
        }).catch(err=>console.log(JSON.stringify(err)));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CoursePage');
    }
    manageGroup(){
        this.navCtrl.push(GroupManagePage,{'course':this.course});
    }
    showCallRollBar(){
        this.showCallBackNote = true;
        let sh = setInterval(()=>{
            this.callBackSeconds --;
            if(this.callBackSeconds == 0){
                this.stopCallRoll();
                clearInterval(sh);
            }
        },1000);
    }
    stopCallRoll(){
        this.note.showToast('点名已结束');
        this.showCallBackNote = false;
        this.navCtrl.push(CallRollRecordPage,{course:this.course});
    }
    stopSpareTime(){
        this.showSpareTimeNote = false;
        this.navCtrl.push(SpareTimeDetailPage,{course:this.course});
    }
    setAnswerList(){
        if(this.question == undefined || this.question.type == Configuration.QUESTION_FILL_BLANK_TYPE) return;
        let answerStr:string = this.question.answerList;
        this.answerArray = answerStr.split('#');
        let cnt = 0;
        for(;cnt < this.answerArray.length; cnt++){
            if(this.answerArray[cnt] != '')
                this.answerArray[cnt] = String.fromCharCode(cnt + 65) + '. '+this.answerArray[cnt];
            else{
                this.answerArray.splice(cnt,1);
                cnt--;
            }
        } 
        console.log(JSON.stringify(this.answerArray));
    }
    setAnswerCounter(){
        if(this.answerArray.length == 0)return;
        this.answerCounter = new Array(this.answerArray.length);
        for(let i = 0; i < this.answerCounter.length; i++){
            this.answerCounter[i] = 0;
        }
    }

    stopQuestion(){
        this.showQuestionNote = false;
        this.navCtrl.push(QuestionRecordPage,{course:this.course})
    }

}
