import { Component, OnInit } from '@angular/core';

import { LogService } from 'src/app/services/log.service';

import { Log } from 'src/app/models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  selectedLog: Log = {id:'', text: '', date: ''};
  loaded: boolean = false;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    })

    this.logService.stateClear.subscribe(clear => {
      if(clear){
        this.selectedLog = {id:'', text: '', date: ''};
      }
    })

  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log){
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }    
  }

}
