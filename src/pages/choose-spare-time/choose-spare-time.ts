import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Configuration } from '../../config/Configuration'; 
import { HttpService } from '../../service/http.service';
import { CoursePage } from '../../pages/course/course';

/**
 * Generated class for the ChooseSpareTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-spare-time',
  templateUrl: 'choose-spare-time.html',
})
export class ChooseSpareTimePage {
    course:any;
    courseTable = new Array();
    col = [0,1,2,3,4,5,6];
    row = [0,1,2,3,4,5,6,7,8,9,10,11]; 
    constructor(public events:Events,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = navParams.get('course');
    }

    ionViewWillLoad() {
        this.initArrays();
    }
    initArrays(){
         for(let i = 0; i < 7; i++){
            this.courseTable[i] = new Array(Configuration.MORNING_COURSE_COUNT + Configuration.AFTERNOON_COURSE_COUNT+Configuration.EVENING_COURSE_COUNT);
            for(let j = 0 ; j < this.courseTable[i].length; j++)
                this.courseTable[i][j] = false;
        }
    }
    chooseItem(row:number,col:number){
       if(!this.courseTable[row][col])
           this.courseTable[row][col] = true;
       else 
           this.courseTable[row][col] = false;

    }
    startSpareTime(){
        let choosed='';
        for(let i:number = 0; i < 7;i++)
            for(let j:number = 0 ; j < this.courseTable[i].length;j++)
                if(this.courseTable[i][j])
                    choosed += i+ ',' + j +';';
        this.http.request('teacher/spareTime','post',{cId:this.course.cId,timeStr:choosed}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.events.publish(Configuration.SPARE_TIME_EVENT,{cId:this.course.cId});
                this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
            }
        })
    }
    getBackgroundColor(row:number,col:number){
        if(this.courseTable[row] == undefined || this.courseTable[row][col] == undefined)
            return;
        if(this.courseTable[row][col])
            return '#B3EE3A';
        else
            return '#fffff8';
    }
}
