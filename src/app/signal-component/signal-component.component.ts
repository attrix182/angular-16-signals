import { Component, effect, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  tasks = signal<TaskModel[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));
  form: any;

  constructor() {
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(''),
      check: new FormControl('')
    });
  }

  deleteAllTasks() {
    this.tasks.set([]);
  }
  
  addTask() {
    this.tasks.update((value) => [...value, { description: this.form.value.description, check: false }]);
    this.form.reset();
  }

  toggleCompletedTask(task: TaskModel) {
    task.check ? this.undoMarkAsComplete(task) : this.markAsComplete(task);
  }

  markAsComplete(task: TaskModel) {
    this.tasks.update((value) => [
      ...value.slice(0, this.tasks().indexOf(task)),
      { ...task, check: true },
      ...value.slice(this.tasks().indexOf(task) + 1)
    ]);
  }

  undoMarkAsComplete(task: TaskModel) {
    this.tasks.update((value) => [
      ...value.slice(0, this.tasks().indexOf(task)),
      { ...task, check: false },
      ...value.slice(this.tasks().indexOf(task) + 1)
    ]);
  }
}
