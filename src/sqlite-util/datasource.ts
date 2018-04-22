import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
@Injectable()
export class SqliteDataSource{
    dataSource:SQLiteObject;
    constructor(public sqlite:SQLite){
         this.initDataBase();
    }
    ngOnInit(){
       
    }
    initDataBase(){
        
        console.log('initDataBase...');
        this.sqlite.create({
            name:'stunion.db',
            location:'default'
        }).then((database:SQLiteObject) =>{
            database.executeSql('CREATE TABLE IF NOT EXISTS COURSE(c_id INTEGER PRIMARY KEY,t_id INTEGER,c_name VARCHAR(255),c_day INTEGER,c_time VARCHAR(255),c_where VARCHAR(255),call_total INTEGER);',{}).then(()=>console.info('创建数据库成功！')).catch((err)=>this.catchError(err))
            this.dataSource = database;
            console.log('dataSource执行结束');
        });
    }

    catchError(err:any):Promise<any>{
        console.info('initDataBaseERROR:');
        console.info(err);
        return Promise.reject(err || err.message);
    }
}