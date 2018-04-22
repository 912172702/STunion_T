import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import {  HttpService } from '../../service/http.service';
/**
 * Generated class for the CreateQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-question',
  templateUrl: 'create-question.html',
})
export class CreateQuestionPage {
    user:any;
    questionType = Configuration.QUESTION_CHOOSE_TYPE;
    answerList = new Array(Configuration.MAX_QUESTION_ANSWER_COUNT);
    answerNumber = ['A'];
    answerCnt = 1;
    trueAnswer='';
    questionContent='';
    score = 0;
    constructor(public events:Events,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
    }
    getIndex(number:string){
        return number.charCodeAt(0) - 'A'.charCodeAt(0);
    }
    addChoice(){
        this.answerCnt ++;
        this.answerNumber.push(String.fromCharCode(65 + this.answerCnt - 1));
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateQuestionPage');
    }
    submit(){
        let answerStr:string = this.answerList.join('#'); 
        this.http.request('question/add','post',{tId:this.user.tId,type:+this.questionType,score:this.score,content:this.questionContent,answerList:answerStr,answer:this.trueAnswer}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                this.events.publish(Configuration.ADD_QUESTION_EVENT,{question:result.extend.question});
                this.navCtrl.pop();
            }
        });
    }
    addLine(){
        this.questionContent += '_____';
    }

/**
tId
type
score
content
answerList
answer     
*/
}
