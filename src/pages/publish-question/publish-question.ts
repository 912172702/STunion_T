import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import {Configuration } from '../../config/Configuration';
import { HttpService } from '../../service/http.service';
import { NoticeProvider } from '../../providers/notice/notice';
/**
 * Generated class for the PublishQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish-question',
  templateUrl: 'publish-question.html',
})
export class PublishQuestionPage {
    question:any;
    answerArray=[];
    answerNum = [];
    course:any;
    constructor(public notice :NoticeProvider,public events:Events,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.course = this.navParams.get('course');
        this.question = this.navParams.get('question');
        this.initAnswerArray();
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionDetailPage');
    }
    getQType(){
        if(this.question.type == Configuration.QUESTION_CHOOSE_TYPE)
            return '选择题';
        else 
            return '填空题';
    }
    initAnswerArray(){
        let answerStr:string = this.question.answerList;
        if(answerStr == null || answerStr == undefined)
            return ;
        let list = answerStr.split('#');
        for(let index = 0; index < list.length;index++){
            if(list[index] != ''){
                this.answerNum.push(this.answerArray.length);
                this.answerArray.push(list[index]);
            }
        }
    }
    getNum(num:number){
        return String.fromCharCode(65 + num) + '.';
    }
    /**
    *    发布题目
    *
    */
    publish(){
        this.http.request('question/publish','post',{cId:this.course.cId,qId:this.question.qId}).then((result)=>{
            if(result.code == Configuration.SUCCESS){
                this.notice.showToast('题目发布成功');
                this.events.publish(Configuration.QUESTION_PUBLISH_EVENT,{cId:this.course.cId,question:this.question,studentsCnt:result.extend.studentsCnt});
                this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
            }
        })
    }

}
