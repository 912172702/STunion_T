import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service'; 
import { Configuration } from '../../config/Configuration';
/**
 * Generated class for the SpareTimeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const week = ['日','一','二','三','四','五','六'];
@IonicPage()
@Component({
  selector: 'page-spare-time-detail',
  templateUrl: 'spare-time-detail.html',
})
export class SpareTimeDetailPage {
    course:any;
    courseTable = new Array(7);
    spareTimes = [];
    row = [0,1,2,3,4,5,6];
    col = [0,1,2,3,4,5,6,7,8,9,10,11]; 
    constructor(public alertCtrl:AlertController,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.initArrays();
    }
    initArrays(){
        for(let i = 0; i < 7; i++){
            this.courseTable[i] = new Array(Configuration.MORNING_COURSE_COUNT + Configuration.AFTERNOON_COURSE_COUNT + Configuration.AFTERNOON_COURSE_COUNT);
            for(let j = 0 ; j < this.courseTable[i].length; j++){
                this.courseTable[i][j] = -1;
            }
        }

         this.http.request('teacher/getSpareTimeResult','get',{cId:this.course.cId}).then(result=>{
            console.log(JSON.stringify(result.extend.result));
            if(result.code == Configuration.SUCCESS){
                let spareTimes = result.extend.result;
                this.spareTimes = spareTimes;
                if(spareTimes != undefined){
                    for(let i = 0; i< spareTimes.length; i++){
                        this.courseTable[spareTimes[i].day][spareTimes[i].index] = spareTimes[i].cnt;
                    }
                } 
            }
        })
    }
    getBackgroundColor(row:number,col:number){
        if(this.courseTable[row] == undefined || this.courseTable[row][col] == undefined)
            return;
        if(this.courseTable[row][col] != -1)
            return '#B3EE3A';
        else
            return '#fffff8';
    }
    checkDetail(){
        let detail = '';
        for(let i = 0; i < this.spareTimes.length; i++){
            let t = this.spareTimes[i];
            detail += '周'+week[t.day] +'第'+(t.index + 1)+'节'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+t.cnt;
            if(i != this.spareTimes.length - 1)
                detail += '<br>';
        }
        this.alertCtrl.create({
            title:'详细信息',
            message:detail,
            buttons:[
                {
                    role:'cancel',
                    text:'返回'
                }
            ]
        }).present();
    }
}
