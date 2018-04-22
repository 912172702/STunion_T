import { Component ,ViewRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StorageService } from '../../service/storage.service';
import { ModalController } from 'ionic-angular';
import { CreateClassPage } from '../create-class/create-class';
import { ChangeDetectorRef } from '@angular/core';
import { CoursePage } from '../course/course';
import { App } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { Configuration } from '../../config/Configuration';
import { Events } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { MyQuestionPage } from '../../pages/my-question/my-question';
import { MyCoursesPage } from '../../pages/my-courses/my-courses';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    courses:any;    
    user: any; 
    constructor(public http:HttpService,public events:Events,public ws:WebsocketProvider,private app:App,private changeDetector:ChangeDetectorRef,private navCtrl: NavController,private menuCtrl:MenuController,private local:StorageService,private modalCtrl:ModalController) {
       this.events.subscribe(Configuration.USER_CHANGE_EVENT,(data)=>{
           this.user = data.user;
            if(!(this.changeDetector as ViewRef).destroyed)
                this.changeDetector.detectChanges();
       });
       this.events.subscribe(Configuration.COURSE_CHANGE_EVENT,(data)=>{
           let course:any = data.course;
           for(let i = 0; i < this.courses.length; i++){
                if(this.courses[i].cId == course.cId){
                    this.courses[i] = course;
                    break;
                }
            }
            this.local.write('courses',this.courses);
            if(!(this.changeDetector as ViewRef).destroyed)
                this.changeDetector.detectChanges();
       });

       this.events.subscribe(Configuration.COURSE_ADD_SUCCESS_EVENT,(data)=>{
           this.courses.push(data.course);
           this.local.write('courses',this.courses);
           if(!(this.changeDetector as ViewRef).destroyed)
               this.changeDetector.detectChanges();
       });

    }
    ionViewDidEnter(){
         this.initCourses();    
    }

    initCourses(){
       /* this.local.read('courses').then(
            courses =>{
                if(courses != null)
                    this.courses = JSON.parse(courses);
                else this.courses = [];  
                this.changeDetector.detectChanges();  
            }
        );*/

        
    }

    
    logout(){
        console.log("登出");
        this.navCtrl.push(LoginPage);
    }

    ionViewWillEnter() {
       
    }
    ionViewWillLoad() {
        this.local.read('user').then((user)=>{
            this.user = JSON.parse(user);
        }).then(()=>{
            this.http.request('course/getAllByTId/'+this.user.tId,'GET',{}).then((data)=>{
                if(data.code == Configuration.SUCCESS){
                    this.courses = data.extend.courses;
                    console.log(JSON.stringify(this.courses));
                }else{
                    alert(data.msg);
                }
            }).then(()=>{
                this.local.write('courses',this.courses);
            });
        });
    }
    openMenu(){
        this.menuCtrl.open();
    } 
    closeMenu(){
        this.menuCtrl.close();
    }
    toggleMenu(){
        this.menuCtrl.toggle();
    }
    createClass(){
        let modal = this.modalCtrl.create(CreateClassPage);
        modal.onDidDismiss(()=>{
            this.initCourses();
        });
        modal.present();
    }
    enterCourse(course:object){
        this.navCtrl.push(CoursePage,{'course':course});
    }

    getUserHeadIcon(){
        if(this.user == null || this.user == undefined)
            return '';
        console.log(JSON.stringify(this.user));
        return Configuration.DOMAIN_PROJECT + this.user.headIcon;
    }
    getCourseIcon(course:any){
        return Configuration.DOMAIN_PROJECT+course.cIcon;
    }
    myQuestion(){
        this.navCtrl.push(MyQuestionPage,{user:this.user});
    }
    myCourses(){
        this.navCtrl.push(MyCoursesPage,{user:this.user});
    }
}
