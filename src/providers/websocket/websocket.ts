import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../config/Configuration';
import { StorageService } from '../../service/storage.service';
import { Events } from 'ionic-angular';
import { Message } from '../../bean/message';
/*1
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {
    ws:WebSocket;
    user:any;
    constructor(public events:Events,public storage:StorageService,public http: Http) {
        console.log('Hello WebsocketProvider Provider');
        this.init();
    }

    init(){
        this.storage.read('user').then((user) =>{
            if(user != null){
                this.user = JSON.parse(user);
                this.connect();
            }else{
                console.log('用户不存在');
            }
        });
    }

    connect(){
        let url:string = 'ws://'+Configuration.IP_PORT+Configuration.PROJECT+Configuration.WEBSOCEET_TOKEN+'/t/'+this.user.tId;
        console.log('url :'+url);
        this.ws = new WebSocket(url);
        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                console.log('正在连接....');
                break;
            case WebSocket.OPEN:
                console.log('链接成功....');
                break;
            case WebSocket.CLOSING:
                console.log('正在关闭....');
                break;
            case WebSocket.CLOSED:
                console.log('已关闭....');
                break;
            default:
                break;
        }
        let that = this;
        this.ws.onopen = function(){
            this.send('Hello! I am caohui');
        }
        this.ws.onclose = function(event){

            console.log('close..\nreason : '+event.reason);
        }
        this.ws.onmessage = function(event){
            let msg:Message = JSON.parse(event.data);
            console.log('接收到Message'+JSON.stringify(msg));
            switch (msg.code) {
                case Configuration.JOIN_COURSE:
                    that.publishEvent(Configuration.JOIN_COURSE_EVENT,msg.extend['student']);
                    break;
                case Configuration.STUDENT_CALL_ROLL:
                    that.publishEvent(Configuration.STUDENT_CALL_ROLL_EVENT,{'cId':msg.extend['cId'],'student':msg.extend['student']});
                    break;
                case Configuration.STUDENT_CHOOSE_ANSWER:
                    that.publishEvent(Configuration.STUDENT_CHOOSE_ANSWER_EVENT,{'cId':msg.extend['cId'],'answer':msg.extend['answer']});
                    break;
                default:
                    console.log('接收到未分类消息..'+JSON.stringify(event.data));
                    break;
            }
        }
        this.ws.onerror = function(event){
            console.log('WebSocket ERROR:' + JSON.stringify(event));
        }
    }

    publishEvent(tag:string,data:any){
        this.events.publish(tag,data,Date.now());
    }
    send(msg:string){
        this.ws.send(msg);
    }

    close(){
        this.ws.close();
    }
}
