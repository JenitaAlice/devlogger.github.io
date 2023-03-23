import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs:Log[];
  private logSource = new BehaviorSubject<Log>({id: '0', text: '', date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.logSource.asObservable();

  constructor() {
    this.logs = [];
   }

   getLogs(): Observable<Log[]>{
    //return of(this.logs);

    if(localStorage.getItem('logs') == null){
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs')!) ;
    }

    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    } ))
   }

   setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
    console.log(localStorage.getItem('logs'));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id == cur.id){
        this.logs.splice(index, 1)
      }    
    });
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id == cur.id){
        this.logs.splice(index, 1)
      } 
    });

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
