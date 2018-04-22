import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
/**
 * Generated class for the QuestionRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-record',
  templateUrl: 'question-record.html',
})
export class QuestionRecordPage {
    course:any;
    records = []
    constructor(public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.http.request('question/stop','get',{cId:this.course.cId}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.records = result.extend.records;
                console.log('records' + JSON.stringify(this.records));
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad QuestionRecordPage');
    }

    getImageSrc(path:string){
        return Configuration.DOMAIN_PROJECT + path;
    }

}
