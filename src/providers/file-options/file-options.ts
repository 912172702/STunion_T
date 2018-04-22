import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject }from'@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NoticeProvider } from '../../providers/notice/notice';
import { FileOpener } from'@ionic-native/file-opener';
import { Configuration } from '../../config/Configuration';

/*
  Generated class for the FileOptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileOptionsProvider {
    // 调用相机时传入的参数
    private cameraOpt = {
        quality: 50,
        destinationType: 1, 
        // Camera.DestinationType.FILE_URI,
        sourceType: 1, 
        // Camera.PictureSourceType.CAMERA,
        encodingType: 0, 
        // Camera.EncodingType.JPEG,
        mediaType: 0, 
        // Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };

    // 调用相册时传入的参数
    private imagePickerOpt = {
        maximumImagesCount: 1,//选择一张图片
        width: 800,
        height: 800,
        quality: 80
    };

    // 图片上传的的api
    public uploadApi:string;

    public upload: any= {
        fileKey: 'upload',//接收图片时的key
        fileName: 'imageName.jpg',
        headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'//不加入 发生错误！！
        },
        params: {}, 
        //需要额外上传的参数
        success: (data)=> { },//图片上传成功后的回调
        error: (err)=> { },//图片上传失败后的回调
        listen: ()=> { }//监听上传过程
    };


    constructor(
        public http: Http,
        private actionSheetCtrl:ActionSheetController,
        private camera:Camera,
        private imagePicker:ImagePicker,
        private transfer:FileTransfer,
        private file:File,
        private fileTransfer:FileTransferObject,
        private noticeProvider:NoticeProvider,
        private fileOpener:FileOpener
        ) {
            this.fileTransfer=this.transfer.create();
            this.fileTransfer.onProgress(progressEvent => {
                if (progressEvent.lengthComputable) {
                    // 下载过程会一直打印，完成的时候会显示 1
                    console.log(progressEvent.loaded / progressEvent.total);
                } else {

                }
            });

    }

    showPicActionSheet() {
        this.useASComponent();
    }

    // 使用ionic中的ActionSheet组件
    private useASComponent() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '选择',
            buttons: [
                {
                    text: '拍照',
                    handler: () => {
                        this.startCamera();
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: () => {
                        this.openImgPicker();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    // 启动拍照功能
    private startCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
           this.uploadImg(imageData);
        }, (err) => {
           this.noticeProvider.showToast('ERROR:' + err); //错误：无法使用拍照功能！
        });
    }
  
    public openImgPickerWithoutUpload(){
        let imgSrcs = [];
        this.imagePicker.getPictures(this.imagePickerOpt).then((results)=> {
            for (var i=0; i< results.length; i++) {
                 imgSrcs.push(results[i]) ;         
            }
        }, (err)=> {
            console.log(JSON.stringify(err));
            this.noticeProvider.showToast('ERROR:'+ err);//错误：无法从手机相册中选择图片！
        });
        return imgSrcs;
    }
    // 打开手机相册
    public openImgPicker(){
        let temp = '';
         console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+JSON.stringify(this.imagePicker));
        this.imagePicker.getPictures(this.imagePickerOpt).then((results)=> {
            for (var i=0; i< results.length; i++) {
                temp = results[i];
            }
            this.uploadImg(temp);
        }, (err)=> {
            console.log(JSON.stringify(err));
            this.noticeProvider.showToast('ERROR:'+ err);//错误：无法从手机相册中选择图片！
        });
    }

    // 上传图片
    private uploadImg(path:string) {
        if (!path) return;
        let options:any;
        options = {
            fileKey: this.upload.fileKey,
            headers: this.upload.headers,
            params: this.upload.params
        };
        this.fileTransfer.upload(path,this.uploadApi, options).then((data)=> {
            if (this.upload.success) 
                this.upload.success(JSON.parse(data.response));
        }, (err) => {
            if (this.upload.error) 
                this.upload.error(err);
            else
                this.noticeProvider.showToast('错误：上传失败！');
        });
    }

    // 停止上传
    stopUpload() {
        if (this.fileTransfer) {
            this.fileTransfer.abort();
        }
    }

    //文件下载
    download(url:string,fileName:string,fileType:string){
        this.fileTransfer.download(url,Configuration.PHONE_STORAGE_PATH+fileName + '.' + fileType).then(entry=>{
            console.log('download complete: ' + entry.toURL());
            //预览
            this.fileOpener.open(decodeURI(entry.nativeURL), this.getFileMimeType(fileType)).then(() => {
                console.log('打开成功');
            }).catch(() => {
                console.log('打开失败');
            });
        },error=>{
            console.log('ERROR:' + JSON.stringify(error));
        })
    }

    
    //根据文件类型得到MIMEType
    getFileMimeType(fileType: string): string {
        let mimeType: string = '';
        switch (fileType) {
            case 'txt':
              mimeType = 'text/plain';
              break;
            case 'docx':
              mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              break;
            case 'doc':
              mimeType = 'application/msword';
              break;
            case 'pptx':
              mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
              break;
            case 'ppt':
              mimeType = 'application/vnd.ms-powerpoint';
              break;
            case 'xlsx':
              mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              break;
            case 'xls':
              mimeType = 'application/vnd.ms-excel';
              break;
            case 'zip':
              mimeType = 'application/x-zip-compressed';
              break;
            case 'rar':
              mimeType = 'application/octet-stream';
              break;
            case 'pdf':
              mimeType = 'application/pdf';
              break;
            case 'jpg':
              mimeType = 'image/jpeg';
              break;
            case 'png':
              mimeType = 'image/png';
              break;
            default:
              mimeType = 'application/' + fileType;
              break;
        }
        return mimeType;
    }

}
