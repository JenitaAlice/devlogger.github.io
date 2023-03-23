import { Component } from '@angular/core';

import { LogService } from 'src/app/services/log.service';

import { Log } from 'src/app/models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent {
  id: string = '0';
  text: string = '';
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    // Subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== '0') {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false;
      }
    });
  }

  onSubmit(){
    if(this.isNew){
      const newLog = {
        id : this.generateId(),
        text: this.text,
        date: new Date()
      } 
      this.logService.addLog(newLog);    
    }else{
      console.log(this.id);
      const updtLog = {
        id : this.id,
        text: this.text,
        date: this.date
      } 
      this.logService.updateLog(updtLog);
    }

    this.onClear();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  onClear() {
    this.isNew = true;
    this.id = '0';
    this.text = '';
    this.date = null;
    this.logService.clearState();
  }

}
