import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule} from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { HttpService } from '../service/http.service';
import { StorageService } from '../service/storage.service';
import { RegisterPage } from '../pages/register/register'; 
import { CreateClassPage } from '../pages/create-class/create-class';
import { CoursePage } from '../pages/course/course';
import { Geolocation } from '@ionic-native/geolocation';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { JoinCoursePage } from '../pages/join-course/join-course';
import { GroupManagePage } from '../pages/group-manage/group-manage';
import { OptionsPage } from '../pages/options/options';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileOptionsProvider } from '../providers/file-options/file-options';
import { NoticeProvider } from '../providers/notice/notice';
import { CallRollRecordPage } from '../pages/call-roll-record/call-roll-record';
import { CallRollHistoryPage } from '../pages/call-roll-history/call-roll-history';
import { CallRollHistoryRecordPage } from '../pages/call-roll-history-record/call-roll-history-record';
import { CallRollTotalStatePage } from '../pages/call-roll-total-state/call-roll-total-state';
import { FileOpener } from '@ionic-native/file-opener';
import { ChooseSpareTimePage } from '../pages/choose-spare-time/choose-spare-time';
import { SpareTimeDetailPage } from '../pages/spare-time-detail/spare-time-detail';
import { HistoryNotificationPage } from '../pages/history-notification/history-notification';
import { NewNotificationPage } from '../pages/new-notification/new-notification';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { CourseApplyPage } from '../pages/course-apply/course-apply';
import { CourseApplyHistoryPage } from '../pages/course-apply-history/course-apply-history';
import { CourseApplyDetailPage } from '../pages/course-apply-detail/course-apply-detail';
import { MyQuestionPage } from '../pages/my-question/my-question';
import { CreateQuestionPage } from '../pages/create-question/create-question';
import { QuestionDetailPage } from '../pages/question-detail/question-detail';
import { QuestionRangePage } from '../pages/question-range/question-range';
import { CourseQuestionPage } from '../pages/course-question/course-question';
import { PublishQuestionPage } from '../pages/publish-question/publish-question';
import { QuestionRecordPage } from '../pages/question-record/question-record';
import { SchoolNewsPage } from '../pages/school-news/school-news';
import { CreateNewsPage } from '../pages/create-news/create-news';
import { ShowMemberDetailPage } from '../pages/show-member-detail/show-member-detail';
import { MyCoursesPage } from '../pages/my-courses/my-courses';
@NgModule({
  declarations:[
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    CreateClassPage,
    CoursePage,
    JoinCoursePage,
    GroupManagePage,
    OptionsPage,
    CallRollRecordPage,
    CallRollHistoryPage,
    CallRollHistoryRecordPage,
    CallRollTotalStatePage,
    ChooseSpareTimePage,
    SpareTimeDetailPage,
    HistoryNotificationPage,
    NewNotificationPage,
    NoteDetailPage,
    CourseApplyPage,
    CourseApplyHistoryPage,
    CourseApplyDetailPage,
    MyQuestionPage,
    CreateQuestionPage,
    QuestionDetailPage,
    CourseQuestionPage,
    PublishQuestionPage,
    QuestionRecordPage,
    QuestionRangePage,
    SchoolNewsPage,
    CreateNewsPage,
    ShowMemberDetailPage,
    MyCoursesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true'
    }),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    CreateClassPage,
    CoursePage,
    JoinCoursePage,
    GroupManagePage,
    OptionsPage,
    CallRollRecordPage,
    CallRollHistoryPage,
    CallRollHistoryRecordPage,
    CallRollTotalStatePage,
    ChooseSpareTimePage,
    SpareTimeDetailPage,
    HistoryNotificationPage,
    NewNotificationPage,
    NoteDetailPage,
    CourseApplyPage,
    CourseApplyHistoryPage,
    CourseApplyDetailPage,
    MyQuestionPage,
    CreateQuestionPage,
    QuestionDetailPage,
    CourseQuestionPage,
    PublishQuestionPage,
    QuestionRecordPage,
    QuestionRangePage,
    SchoolNewsPage,
    CreateNewsPage,
    ShowMemberDetailPage,
    MyCoursesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    StorageService,
    Geolocation,
    WebsocketProvider,
    Camera,
    ImagePicker,
    File,
    FileTransfer,
    FileTransferObject,
    FileOptionsProvider,
    NoticeProvider,
    FileOpener
  ]
})
export class AppModule {}
