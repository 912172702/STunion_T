import { Injectable } from '@angular/core'
import { SqliteDataSource } from '../sqlite-util/datasource' 
import { SQLiteObject } from '@ionic-native/sqlite';
import {Course} from '../entity/course';
@Injectable()
export class CourseService {
    
    database:SQLiteObject;
    constructor(public  dataSource:SqliteDataSource) {
        // code...
        this.database = this.dataSource.dataSource;
        console.log('CourseService构造器。');
    }

    insert(c:Course){
        this.database.executeSql('INSERT INTO course VALUES(?,?,?,?,?,?,?)',[c.cId,c.tId,c.cName,c.cDay,c.cTime,c.cWhere,c.callTotal]).then(()=>console.log('插入course成功！')).catch(err=>this.catchError(err));
    }
    delete(id:number){
        this.database.executeSql('DELETE FROM course WHERE cId = ?',[id]).then(()=>console.log('删除course成功！')).catch(err=>this.catchError(err));
    }
    update(c:Course){
        this.database.executeSql('UPDATE course SET t_id = ?, c_name = ?, c_day = ?, c_time = ?, c_where = ?, call_total = ? WHERE c_id = ?',[c.tId,c.cName,c.cDay,c.cTime,c.cWhere,c.callTotal,c.cId]).then(()=>console.log('修改course成功！')).catch((err)=>this.catchError(err));
    }
    queryOne(id:number){
        this.database.executeSql('SELECT * FROM course WHERE c_id = ?',[id]).then(result=>console.log('sqlite返回结果'+result))
    }
    catchError(err:any):Promise<any>{
        console.info('ERROR');
        console.info(err);
        return Promise.reject(err || err.message);
    }
}