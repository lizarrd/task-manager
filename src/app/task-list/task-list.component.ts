import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [ LocalStorageService ]
})
export class TaskListComponent implements OnInit {

  name=''; //название таска
  description=''; // описание таска
  deadline=''; // дедлайн выполнения таска или дата выполнения для завершенных тасков
  allowButtonClick=false; // разрешение нажатия кнопки Add Task

  tasks: Task[]=[]; // массив для тасков
  doneTasks: Task[]=[]; // массив для выполненных тасков

  @Input() taskItem;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    //получение всех тасков
    this.localStorageService.getTasks(this.tasks, this.doneTasks);
  }

//добавление нового таска
  addTask(){
    this.tasks.push(new Task(this.name, this.description, this.deadline, false));
    this.localStorageService.addTask(this.name, this.description, this.deadline, false);
    this.name='';
    this.description='';
    this.deadline='';
    this.allowButtonClick=false;
  }

//проверка полей ввода на пустоту для активации кнопки добавления
  onAllowButtonClick(){
    if (this.name!=='')
      this.allowButtonClick=true;
    else this.allowButtonClick=false;
  }

//выполнение таска
  onTaskDone(task: Task){
    this.localStorageService.doneTask(task, this.doneTasks, this.tasks);
  }

//удаление таска
  onTaskDelete(task: Task){
    this.localStorageService.deleteTask(task);
      if (task.isDone===false){
        this.tasks.splice(this.tasks.indexOf(task), 1);
      } else this.doneTasks.splice(this.doneTasks.indexOf(task), 1);
    }

  }
