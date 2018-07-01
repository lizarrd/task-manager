import { Task } from './task-list/task.model';

export class LocalStorageService{

  tasks: Task[] = []; // массив тасков
  doneTasks: Task[] = []; // массив выполненных тасков
  keys: string[] = []; // массив ключей локального хранилища

//получение массива ключей из локального хранилища
  getKeys(){
    this.keys = Object.keys(localStorage);
    return this.keys;
  }

//получение ключа по значению
  getTaskKey(taskItem){
    this.getKeys();
    for(let i=0; i<this.keys.length; i++){
        let obj = JSON.parse(localStorage.getItem(String(this.keys[i])));
        if (obj.name==taskItem.name && obj.description==taskItem.description){
          return this.keys[i];
          }
      }
  }

//получение всех тасков из хранилища и помещение их в массив
  getTasks(tasks, doneTasks){
    this.getKeys();
    for ( let i = 0; i < this.keys.length; i++ ) {
      let obj = JSON.parse(localStorage.getItem(String(this.keys[i])));
      if (obj.isDone===false){
        tasks.push(new Task(obj.name, obj.description, obj.deadline, obj.isDone));
        }
      else doneTasks.push(new Task(obj.name, obj.description, obj.deadline, obj.isDone));
      }
  }


//добавление нового таска в хранилище
  addTask(name: string, description: string, deadline: string, isDone: boolean){
    this.getKeys();
      if (this.keys.length>0){
        let max = Math.max.apply(Math, this.keys);
        localStorage.setItem(max+1, JSON.stringify(new Task(name, description, deadline, false)));
    } else localStorage.setItem(String(1), JSON.stringify(new Task(name, description, deadline, false)));
  }

//выполнение таска
  doneTask(task: Task, doneTasks, tasks){
    tasks.splice(tasks.indexOf(task), 1);
    doneTasks.push(new Task(task.name, task.description, this.dateParse(), true));
    let key = this.getTaskKey(task);
    localStorage.setItem(key, JSON.stringify(new Task(task.name, task.description, this.dateParse(), true)));
  }

  dateParse (){
    let today = new Date;
    let todayFormat = today.getFullYear() + '-' + Number(today.getMonth()+1) + '-' + today.getDate();
    return String(todayFormat);
  }

//удаление таска из хранилища
  deleteTask(task){
    let index = this.getTaskKey(task);
    localStorage.removeItem(index);
  }

//сохранение редактирования таска
  saveEdit(taskItem: Task, newName: string, newDescription: string, newDeadline: string){
    let index = this.getTaskKey(taskItem);
      console.log(taskItem.isDone);

    if (newName!==""){
      taskItem.name=newName;
    }
      if (newDescription!==""){
        taskItem.description=newDescription;
      }
        if (newDeadline!==""){
          taskItem.deadline=newDeadline;
        }
        console.log(taskItem.isDone);
    localStorage.setItem(index, JSON.stringify(new Task(taskItem.name, taskItem.description, taskItem.deadline, taskItem.isDone)));
  }

}
