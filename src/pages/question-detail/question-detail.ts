import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
/**
 * Generated class for the QuestionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html',
})
export class QuestionDetailPage {
    question:any;
    answerArray=[];
    answerNum = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
