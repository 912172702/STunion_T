import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration'; 
import { HttpService } from '../../service/http.service';
import { FileOptionsProvider } from '../../providers/file-options/file-options';

/**
 * Generated class for the CallRollHistoryRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-roll-history-record',
  templateUrl: 'call-roll-history-record.html',
})
export class CallRollHistoryRecordPage {
    course:any;
    time:string;
    records=[];
    constructor(public fileOption:FileOptionsProvider,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.time = this.navParams.get('time');
        this.http.request('teacher/callRollRecordItem','get',{cId:+this.course.cId,time:this.time}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.records = result.extend.records;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CallRollHistoryRecordPage');
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
    outputExcel(){
        this.fileOption.download(Configuration.DOMAIN_PROJECT+'teacher/outputExcel/'+this.course.cId+'/'+this.time.replace(' ','%20'),'考勤记录'+this.time.replace(' ','_').replace(':','_').replace(':','_'),'xls');
    }
}
