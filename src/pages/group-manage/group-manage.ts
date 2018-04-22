import { Component ,ViewRef,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { StorageService } from '../../service/storage.service';
import { Configuration } from '../../config/Configuration';
import { Student } from '../../entity/student';
import { FileOptionsProvider } from '../../providers/file-options/file-options';
import { NoticeProvider } from '../../providers/notice/notice';
import { Events,ActionSheetController,AlertController,PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CallRollHistoryPage } from '../../pages/call-roll-history/call-roll-history';
import { ChooseSpareTimePage } from '../../pages/choose-spare-time/choose-spare-time';
import { NewNotificationPage } from '../../pages/new-notification/new-notification';
import { HistoryNotificationPage } from '../../pages/history-notification/history-notification';
import { CourseApplyPage } from '../../pages/course-apply/course-apply';
import { CourseApplyHistoryPage } from '../../pages/course-apply-history/course-apply-history';
import { CourseQuestionPage } from '../../pages/course-question/course-question';
import { QuestionRangePage } from '../../pages/question-range/question-range';
import { ShowMemberDetailPage } from '../../pages/show-member-detail/show-member-detail';
/**
 * Generated class for the GroupManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-manage',
  templateUrl: 'group-manage.html',
})
export class GroupManagePage {
    course:any;
    students = [];
    rowCount = 5;
    image='assets/icon/defaulthead.jpg';
    constructor(public popOver:PopoverController,public platform:Platform,public geolocation:Geolocation,public alertCtrl:AlertController,public actionSheetCtrl:ActionSheetController,public changeDetector :ChangeDetectorRef,public events:Events,public fileOpt:FileOptionsProvider,public notice:NoticeProvider,public http:HttpService,public storage:StorageService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');   
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupManagePage');
        this.http.request('student/getStudentsByCourseId','get',{'cId':this.course.cId}).then(data=>{
            if(data.code == Configuration.SUCCESS){
                this.students = data.extend.students;
            }
        });
    }
    getRowCountRange(){
        let row = Math.ceil(this.students.length / this.rowCount);
        let rowC = [];
        for(let i = 0 ; i < row; i++)
            rowC.push(i);
        return rowC;
    }

    getStudentRow(index:number){
        let first = this.rowCount * index;
        let row = [];
        for(let i = first; i < this.students.length && i < first + this.rowCount; i++)
            row.push(this.students[i]);
        let buyu = row.length;
        for(let i = buyu; i < this.rowCount; i++)
            row.push(new Student());
        return row;
    }

    getImageSrc(src:string){
        return Configuration.DOMAIN_PROJECT + src;
    }
    getSimpleName(stuName:string){
        if(stuName == undefined) return;
        if(stuName.length < 6) return stuName;
        return stuName.substr(0,6) + '...';
    }
    getCourseIconSrc(){
        if(this.course == undefined || this.course == null)
            return;
        console.log('getCourseIconSrc : '+JSON.stringify(this.course));
        return Configuration.DOMAIN_PROJECT + this.course.cIcon;
    }

    showDetail(stu:any){
        this.popOver.create(ShowMemberDetailPage,{student:stu}).present();
    }
    changeCourseIcon(){
        if(this.course == undefined || this.course == null) return;
        this.initFileOpt();
        this.fileOpt.showPicActionSheet();
    }
    initFileOpt(){
        this.fileOpt.uploadApi = Configuration.DOMAIN_PROJECT + 'upload/courseIcon/'+this.course.cId;
         this.fileOpt.upload.success = (data)=>{
            if(data.code == Configuration.SUCCESS){
                this.course = data.extend.course;
                this.events.publish(Configuration.COURSE_CHANGE_EVENT,{
                    'course':this.course                       
                });
                if(!(this.changeDetector as ViewRef).destroyed)
                    this.changeDetector.detectChanges();
            }else if(data.code == Configuration.UPLOAD_HEAD_ERROR){
                this.notice.showToast(data.msg);
            }
        };
        this.fileOpt.upload.error = (data)=>{
            this.notice.showToast('ERROR:' + JSON.stringify(data));
        };
    }

    //考勤
    callRoll(){
        this.showCallRollActionSheet()
    }
    showCallRollActionSheet(){
        this.actionSheetCtrl.create({
            title:'选择',
            buttons:[
                {
                    text:'历史记录',
                    handler:()=>{
                        this.navCtrl.push(CallRollHistoryPage,{'course':this.course});
                    }
                },
                {
                    text:'课堂考勤',
                    handler:()=>{
                        this.showCallRollAlert();
                    }
                }
            ]
        }).present();
    }

    showCallRollAlert(){
        let myAlert = this.alertCtrl.create({
            title:'填写倒计时时间',
            inputs:[
                {
                    type:'number',
                    name:'rollBackTime',
                    placeholder:'倒计时/分钟 <= 60'
                }
            ],
            buttons:[
                {
                    text:'开始考勤',
                    handler: data=>{
                        this.startCallRoll(data.rollBackTime);
                    }
                },
                {
                    text:'取消',
                    role:'cancel'
                }
            ]
        }).present();
    }
    startCallRoll(time:number){
        let seconds = time * 60;
        //获取地理位置
        this.platform.ready().then(()=>{
            this.geolocation.getCurrentPosition().then(pos=>{
                let longitude = pos.coords.longitude;
                let latitude = pos.coords.latitude;
                //发送普通点名请求
                this.http.request('teacher/callroll','GET',{'cId':this.course.cId,'time':+seconds,'longitude':longitude,'latitude':latitude}).then(data=>{
                    if(data.code == Configuration.SUCCESS){
                        this.notice.showToast('正在考勤....');
                    };
                }).then(()=>{
                    //发布点名事件
                    this.events.publish(Configuration.SIMPLE_CALL_ROLL_EVENT,{'time':seconds,'count':this.students.length});
                    this.navCtrl.pop();
                });
            })
        })
    }

    startSpareTime(){
        this.navCtrl.push(ChooseSpareTimePage,{course:this.course});
    }

    /***************************                   通知                     ******************************/
    nitification(){
        this.showNotificationSheetAction();
    }
    showNotificationSheetAction(){
        this.actionSheetCtrl.create({
            title:'选择',
            buttons:[
                {
                    text:'历史通知',
                    handler:()=>{
                        this.navCtrl.push(HistoryNotificationPage,{'course':this.course});
                    }
                },
                {
                    text:'创建新通知',
                    handler:()=>{
                        this.navCtrl.push(NewNotificationPage,{'course':this.course});
                    }
                }
            ]
        }).present();
    }
     /***************************                   课程预约                     ******************************/
    courseApply(){
        this.showCourseApplySheetAction();
    }
    showCourseApplySheetAction(){
        this.actionSheetCtrl.create({
            title:'选择',
            buttons:[
                {
                    text:'历史预约',
                    handler:()=>{
                        this.navCtrl.push(CourseApplyHistoryPage,{'course':this.course});
                    }
                },
                {
                    text:'创建新的预约',
                    handler:()=>{
                        this.navCtrl.push(CourseApplyPage,{'course':this.course});
                    }
                }
            ]
        }).present();
    }

    //*********************************************   课堂问答   ***********************************************/
    question(){
        this.actionSheetCtrl.create({
            title:'选择',
            buttons:[
                {
                    text:'得分排行',
                    handler:()=>{
                        this.navCtrl.push(QuestionRangePage,{'course':this.course});
                    }
                },
                {
                    text:'发起提问',
                    handler:()=>{
                        this.navCtrl.push(CourseQuestionPage,{'course':this.course});
                    }
                }
            ]
        }).present();
    }
}
