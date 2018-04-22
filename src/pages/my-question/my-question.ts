import { Component,ChangeDetectorRef,ViewRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events,AlertController } from 'ionic-angular';
import { CreateQuestionPage } from '../../pages/create-question/create-question';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { QuestionDetailPage } from '../../pages/question-detail/question-detail';
/**
 * Generated class for the MyQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-question',
  templateUrl: 'my-question.html',
})
export class MyQuestionPage {
    manage=false;
    option='管理';
    user:any;
    questions = [];
    selected = {};
    constructor(public alert:AlertController,public changeDetector:ChangeDetectorRef,public events:Events,public http:HttpService,public navCtrl: NavController, public navParams: NavParams) {
        this.user = this.navParams.get('user');
        this.http.request('question/all','get',{tId:this.user.tId}).then((result)=>{
            if(result.code == Configuration.SUCCESS)
                this.questions = result.extend.questions;
        });
        this.events.subscribe(Configuration.ADD_QUESTION_EVENT,data=>{
            if(data.question != undefined){
                this.questions.unshift(data.question);
                this.selected[data.question.qId] = false;
                if(!(this.changeDetector as ViewRef).destroyed)
                    this.changeDetector.detectChanges();
            }
        })
    }

    getSimpleContent(content:string){
        if(content == undefined) return;
        if(content.length < 58) return content;
        return content.substr(0,58) + '...';
    }
    ionViewDidLoad() {
    console.log('ionViewDidLoad MyQuestionPage');
    }
    add(){
        this.navCtrl.push(CreateQuestionPage,{user:this.user});
        this.optionChange();
    }
    delete(){
        let ids:string = '';
        for(let key in this.selected){
            if(this.selected[key]){
                ids += key + ',';
            }
        }
        if(ids != ''){
            this.alert.create({
                title:'警告',
                message:'您确定要删除吗？',
                buttons:[
                    {
                        text:'确定',
                        handler:()=>{
                            this.http.request('question/delete','delete',{ids:ids,tId:this.user.tId}).then(result=>{
                                if(result.code == Configuration.SUCCESS){
                                    let idArrays = ids.split(',');
                                    for(let id of idArrays){
                                        for(let index = 0; index < this.questions.length;index++){
                                            if(this.questions[index].qId == id){
                                                this.questions.splice(index,1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }).then(()=>{
                                if(!(this.changeDetector as ViewRef).destroyed)
                                    this.changeDetector.detectChanges();
                                this.optionChange();
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
    optionChange(){
        this.manage = !this.manage;
        if(this.manage){
            this.option = '取消';
            for(let q of this.questions){
                this.selected[q.qId] = false;
            }
        }
        else
            this.option = '管理';
    }
    questionDetail(q:any){
        this.navCtrl.push(QuestionDetailPage,{question:q});
    }
    getQType(q:any){
        if(q.type == Configuration.QUESTION_CHOOSE_TYPE)
            return '选择题';
        else
            return '填空题';
    }
}
