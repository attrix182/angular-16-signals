import { Injectable, effect, signal } from '@angular/core';
import { TaskModel } from './signal-component.component';

@Injectable({
  providedIn: 'root'
})
export class SignalTasksService {
  tasks = signal<TaskModel[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));

  constructor() {}

  deleteAllTasks() {
    this.tasks.set([]);
  }

  addTask(formValues: TaskModel) {
    this.tasks.update((value) => [...value, { description: formValues.description, check: false }]);
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

  toggleCompletedTask(task: TaskModel) {
    task.check ? this.undoMarkAsComplete(task) : this.markAsComplete(task);
  }
}
