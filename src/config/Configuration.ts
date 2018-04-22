export class Configuration{
   public static WEBSOCEET_TOKEN = 'stunion';
   public static IP_PORT = '172.20.10.2:8080';
   //public static IP_PORT = '10.9.189.38:8080';
   public static DOMAIN = 'http://' + Configuration.IP_PORT;
   public static PROJECT = '/sunion-main/';
   public static DOMAIN_PROJECT = Configuration.DOMAIN + Configuration.PROJECT;
   public static PHONE_STORAGE_PATH = 'file:///storage/sdcard1/Android/data/io.ionic.starter/files/';
   public static SUCCESS = 1;
   public static LOGIN_ERROR = 2;
   public static TEL_IS_BINDED = 3;
   public static IDCARD_IS_BINDED = 4;
   public static NO_SCHOOL_INFO = 5;
   public static JOIN_COURSE = 9;
   public static UPLOAD_HEAD_ERROR = 12;
   public static SIMPLE_CALL_ROLL = 13;
   public static STUDENT_CALL_ROLL = 15;
   public static SPARE_TIME = 16;
   public static NORMAL_NOTIFICATION = 17;
   public static COURSE_APPLY = 18;
   public static STUDENT_CHOOSE_ANSWER = 21;
   public static MORNING_COURSE_COUNT = 5;
   public static AFTERNOON_COURSE_COUNT = 4;
   public static EVENING_COURSE_COUNT = 3;
   public static NORMAL_NOTIFICATION_TYPE = 1;
   public static COURSE_APPLY_TYPE = 2; 
   public static MAX_QUESTION_ANSWER_COUNT = 100;
   public static QUESTION_CHOOSE_TYPE = 1;
   public static QUESTION_FILL_BLANK_TYPE = 2;
   public static USRE_TYPE_STUDENT = 1;
   public static USRE_TYPE_TEACHER = 2;

   //接受信息 发布的Event类型
   public static JOIN_COURSE_EVENT = 'join_course_event';
   public static USER_CHANGE_EVENT = 'user_change_event';
   public static COURSE_CHANGE_EVENT = 'course_change_event';
   public static COURSE_ADD_SUCCESS_EVENT = 'COURSE_ADD_SUCCESS_EVENT';
   public static SIMPLE_CALL_ROLL_EVENT = 'simple_call_roll_event';
   public static STUDENT_CALL_ROLL_EVENT = 'student_call_roll_event';
   public static SPARE_TIME_EVENT = 'spare_time_event';
   public static ADD_QUESTION_EVENT = 'ADD_QUESTION_EVENT';
   public static QUESTION_PUBLISH_EVENT= 'QUESTION_PUBLISH_EVENT';
   public static STUDENT_CHOOSE_ANSWER_EVENT ='student_choose_answer_event'; 
   public static NEWS_ADD_EVENT = 'news_add_event';
   //点名状态
   public static ATTEND = 1;
   public static ABSENCE = 2;
   public static LATE = 3;
   public static ASK_FOR_LEAVE = 4;

   //学生考勤状态
   public static NORMAL_MAX_ABSENCE_CNT = 2;
   public static WARNING_MAX_ABSENCE_CNT = 4;

}
/*
LOGIN_FAIL(0, "登陆失败")
, LOGIN_SUCCESS(1, "登陆成功")
, LOGIN_ERROR(2, "手机号或密码错误")
, TEL_IS_BINDED(3, "手机号已被绑定")
, IDCARD_IS_BINDED(4, "身份证号已绑定")
*/