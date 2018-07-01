import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  providers: [ LocalStorageService ]
})
export class TaskItemComponent implements OnInit {

  @Input() taskItem: Task; // выбранный таск
  @Output() delTask = new EventEmitter<Task>(); // событие на удаление таска
  @Output() doneTask = new EventEmitter<Task>(); // событие на выполнение таска
  isTaskSelected=false; // разрешение на открытие доп.информации по таску

  constructor() { }

  ngOnInit() {
  }

//показ доп.информации по таску
  viewDetails(show){
    if (this.isTaskSelected==false)
      this.isTaskSelected=true;
    else this.isTaskSelected=false;
  }

//передача родительскому компоненту данных об удаленном таске
  onDeletedTask(){
    this.delTask.emit(this.taskItem);
  }

//вычисление оставшегося количества дней до дедлайна
  onTestDeadline(taskItem){
    let today = new Date();
    let days = Date.parse(taskItem.deadline)-today.getTime();
    return days/1000/60/60/24;
  }


}
