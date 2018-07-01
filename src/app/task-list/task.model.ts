export class Task {

  name: string;
  description: string;
  deadline: string;
  isDone: boolean;

  constructor(name: string, description: string, deadline: string, isDone: boolean){
    this.name=name;
    this.description=description;
    this.deadline=deadline;
    this.isDone=isDone;
  }


}
