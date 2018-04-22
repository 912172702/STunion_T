import { Component, ElementRef,ViewRef, ViewChild,OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Configuration } from '../../config/Configuration';
import { ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../../service//http.service';
import { Message } from '../../bean//message';
/**
 * Generated class for the JoinCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-course',
  templateUrl: 'join-course.html',
})
export class JoinCoursePage implements OnDestroy{
    @ViewChild('scrollMe') private scroller:ElementRef;
    joinCode = [];
    joined = [];
    number:string;
    constructor(public http:HttpService,public changeDetector:ChangeDetectorRef,public events:Events,public navCtrl: NavController, public navParams: NavParams) {
        this.number = this.navParams.get('code');
        for (let i = 0; i < this.number.length ; i++) {
            this.joinCode.push(+this.number.charAt(i));
        }
        //订阅事件
        this.subscribeJoin(); 
    }

    subscribeJoin(){
        this.events.subscribe(Configuration.JOIN_COURSE_EVENT,(student)=>{
            this.joined.push(student);
            console.log('push 一个学生:'+JSON.stringify(student));
            if(!(this.changeDetector as ViewRef).destroyed)
                this.changeDetector.detectChanges();
            this.scrollToBottom();
            
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad JoinCoursePage');
    }
    ionViewDidEnter(){
        console.log('ionViewDidEnter JoinCoursePage');
    }
    //滚动条滚动到最下面
    scrollToBottom():void{
        try{
            this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
        }catch(err){
            console.log(JSON.stringify(err));
        }
    }
    //停止面对面建群
    stop():void{
        this.http.request('course/stopface/t','post',{'code':this.number,'tId':this.navParams.get('tId')}).then(result=>{
            if(result.code == Configuration.SUCCESS){
                console.log('面对面加入关闭..');
            }
        }).then(()=>this.navCtrl.pop()).catch(err=>console.log(JSON.stringify(err)));
    }
    ngOnDestroy(){
        console.log('ngOnDestroy');
        this.changeDetector.detach();
    }
    getHeadIcon(icon:string){
        return Configuration.DOMAIN_PROJECT + icon;
    }
}
