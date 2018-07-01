import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model';
import { LocalStorageService } from '../../../local-storage.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [ LocalStorageService ]
})
export class TaskDetailComponent implements OnInit {

  @Input() detailedTaskItem: Task; // выбранный для открытия доп.информации таск
  @Output() deletedTask = new EventEmitter<Task>(); //событие удаление таска
  taskEdit=false; // открытие доп.функций редактирования таска
  newName=''; // новое название таска
  newDescription=''; // новое описание
  newDeadline=''; // новый дедлайн

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {}

//передача родительскому компоненту данных об удаленном таске
  onDeleteTask(){
    this.deletedTask.emit();
  }

//открытие формы для редактирования таска
  onEditTask(){
    this.taskEdit=true;
  }

//сохранение отредактированных данных
  onSaveEdit(){
    this.localStorageService.saveEdit(this.detailedTaskItem, this.newName, this.newDescription, this.newDeadline);
    this.taskEdit=false;
  }
}
