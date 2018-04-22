import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { FileOptionsProvider } from '../../providers/file-options/file-options';
/**
 * Generated class for the CallRollTotalStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-roll-total-state',
  templateUrl: 'call-roll-total-state.html',
})
export class CallRollTotalStatePage {
    course:any;
    statuses = [];
    constructor(public fileOption:FileOptionsProvider,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('teacher/totalAttendStatus','get',{'cId':+this.course.cId}).then((result) =>{
            if(result.code == Configuration.SUCCESS){
                this.statuses = result.extend.statuses;
            }
        });
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CallRollTotalStatePage');
    }
    getState(status:any){
        let absenceCnt = status.absenceCnt
        if(absenceCnt <= Configuration.NORMAL_MAX_ABSENCE_CNT)
            return '正常';
        else if(absenceCnt > Configuration.NORMAL_MAX_ABSENCE_CNT && absenceCnt <= Configuration.WARNING_MAX_ABSENCE_CNT)
            return '警告';
        else 
            return '特殊';
    }
    isNormal(status:any){
        return status.absenceCnt <= Configuration.NORMAL_MAX_ABSENCE_CNT;
    }
    isWarning(status:any){
        return status.absenceCnt > Configuration.NORMAL_MAX_ABSENCE_CNT &&  status.absenceCnt <= Configuration.WARNING_MAX_ABSENCE_CNT;
    }
    isSpecial(status:any){
        return status.absenceCnt > Configuration.WARNING_MAX_ABSENCE_CNT;
    }
    outputExcel(){
        this.fileOption.download(Configuration.DOMAIN_PROJECT + 'teacher/outputExcel/' + this.course.cId,'班级考勤总表','xls')
    }
}
