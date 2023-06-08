import { Component, effect, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignalTasksService } from './signal-tasks.service';

export interface TaskModel {
  description: string;
  check: boolean;
}
@Component({
  selector: 'app-signal-component',
  templateUrl: './signal-component.component.html',
  styleUrls: ['./signal-component.component.scss']
})
export class SignalComponentComponent {
  form: any;
  tasks: any = []

  constructor(private signalSvc: SignalTasksService) {
    effect(() => {
      this.tasks = this.signalSvc.tasks();
      localStorage.setItem('tasks', JSON.stringify(this.signalSvc.tasks()));
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(''),
      check: new FormControl('')
    });
  }


  
  addTask() {
    if(!this.form.value.description) return;
    this.signalSvc.addTask(this.form.value);
    this.form.reset();
  }

  undoMarkAsComplete(task: TaskModel) {
    this.signalSvc.undoMarkAsComplete(task);
  }

  deleteAllTasks() {
    this.signalSvc.deleteAllTasks();
  }

  toggleCompletedTask(task: TaskModel) {
    this.signalSvc.toggleCompletedTask(task);
  }

  markAsComplete(task: TaskModel) {
    this.signalSvc.markAsComplete(task);
  }








}
