import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { CallRollHistoryRecordPage } from '../../pages/call-roll-history-record/call-roll-history-record';
import { CallRollTotalStatePage } from '../../pages/call-roll-total-state/call-roll-total-state';
/**
 * Generated class for the CallRollHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-roll-history',
  templateUrl: 'call-roll-history.html',
})
export class CallRollHistoryPage {

    course:any;
    times = [];
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = navParams.get('course');
        console.log(JSON.stringify(this.course));
        this.http.request('teacher/getHistoryTime','get',{'cId':this.course.cId}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.times = result.extend.times;
                console.log(JSON.stringify(this.times));
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CallRollHistoryPage');
    }
    checkHistory(time:string){
        this.navCtrl.push(CallRollHistoryRecordPage,{'course':this.course,'time':time});
    }
    getTotalState(){
        this.navCtrl.push(CallRollTotalStatePage,{'course':this.course});
    }
}
