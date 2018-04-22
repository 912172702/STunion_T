import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { Configuration } from '../../config/Configuration';
import { AlertController } from 'ionic-angular';
import { StorageService } from '../../service/storage.service';
import { Events } from 'ionic-angular';
/**
 * Generated class for the CreateClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-class',
  templateUrl: 'create-class.html',
})
export class CreateClassPage {  
    cName:string;
    cDay:string;
    cTime:string;
    cWhere:string;
    days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    values = [0,1,2,3,4,5,6];
    constructor(public events:Events,public storage:StorageService,public alertCtrl: AlertController, public http:HttpService, public navCtrl: NavController, public navParams: NavParams) {
    }

    cancel(){
        this.navCtrl.pop();
    }
    create(){
        this.storage.read('user').then(
            user=>{
                if(user != null){
                    user = JSON.parse(user);
                    this.http.request('course/add','post',{'tId':user.tId,'cName':this.cName,'cDay':+this.cDay,'cTime':this.cTime,'cWhere':this.cWhere}).then(
                        data=>{
                            if(data.code == Configuration.SUCCESS){
                               this.events.publish(Configuration.COURSE_ADD_SUCCESS_EVENT,{'course':data.extend.course});
                               /* this.storage.read('courses').then(courses =>{
                                    console.log('before insert..' + courses);
                                    if(courses != null){
                                        courses = JSON.parse(courses);
                                        courses.push(data.extend.course);
                                        this.storage.write('courses',courses);
                                    }else{
                                        courses = [];
                                        courses.push(data.extend.course);
                                        this.storage.write('courses',courses);
                                    }
                                });*/
                            }else{
                                this.alertCtrl.create({
                                    title:'错误',
                                    message:data.msg,
                                    buttons:['确定'],
                                }).present();
                            }
                        }
                    );
                }
                this.navCtrl.pop();
            }
        );
       
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateClassPage');
    }

}
