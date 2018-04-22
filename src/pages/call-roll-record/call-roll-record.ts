import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform ,Navbar} from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the CallRollRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-roll-record',
  templateUrl: 'call-roll-record.html',
})
export class CallRollRecordPage {
    callRollRecords = [];
    course : any;
    attend = true;
    absence = false;
    late = false;
    askForLeave = false;
    changeStr='';
    @ViewChild(Navbar) navBar: Navbar;
    backButtonClick = (e:UIEvent)=>{
        this.cancelSave();
    }
    constructor(public plat:Platform,public alertCtrl:AlertController,public notice:NoticeProvider,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/getCallRollInfos','get',{'cId':this.course.cId}).then((data) =>{
            if(data.code == Configuration.SUCCESS)
                this.callRollRecords = data.extend.infos;
            console.log(JSON.stringify(this.callRollRecords));
        });
        this.plat.registerBackButtonAction(()=>{
            this.cancelSave();
        });
        this.navCtrl.last().showBackButton(false);
    }
    goBack(){
        this.cancelSave();
    }
    ionViewDidLoad() {
        this.navBar.backButtonClick = this.backButtonClick;
    }

    attendCheck(info:any){
        return info.state == Configuration.ATTEND;
    }
    absenceCheck(info:any){
        return info.state == Configuration.ABSENCE;
    }
    lateCheck(info:any){
        return info.state == Configuration.LATE;
    }
    askForLeaveCheck(info:any){
        return info.state == Configuration.ASK_FOR_LEAVE;
    }
    //change
    toAttend(info:any){
        this.changeStr += ','+info.student.stuId+'>' + Configuration.ATTEND;
    }
    toAbsence(info:any){
        this.changeStr += ','+info.student.stuId+'>' + Configuration.ABSENCE;
    }
    toLate(info:any){
        this.changeStr += ','+info.student.stuId+'>' + Configuration.LATE;
    }
    toAskForLeave(info:any){
        this.changeStr += ','+info.student.stuId+'>' + Configuration.ASK_FOR_LEAVE;
    }
    saveRecords(){
        console.log(this.changeStr);
        this.http.request('teacher/saveRecords','post',{'cId':this.course.cId,'changeStr':this.changeStr}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.notice.showToast('保存成功！可在考勤记录中查看！');
                this.navCtrl.pop();
            }
        });
    }
    cancelSave(){
        this.alertCtrl.create({
            title:'警告',
            subTitle:'确定不保存吗？',
            buttons:[
                {
                    text:'确定',
                    handler:()=>{
                        this.http.request('teacher/cancelRecords','delete',{'cId':this.course.cId}).then((result)=>{
                            if(result.code == Configuration.SUCCESS)
                                this.navCtrl.pop();
                        });
                    }
                },
                {
                    text:'取消',
                    role:'cancel'
                }
            ]
        }).present();
    }
}
