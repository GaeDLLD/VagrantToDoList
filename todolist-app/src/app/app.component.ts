import { Component } from '@angular/core';

export interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: Task[] = [
    {
      title: 'Task 1',
      description: 'Description 1',
    },
    {
      title: 'Task 2',
      description: 'Description 2',
    },
    {
      title: 'Task 3',
      description: 'Description 3',
    },
  ];

  newTitle: string;
  newDescription: string;

  add(): void {
    this.tasks.push({description: this.newDescription, title: this.newTitle});
    this.newTitle = '';
    this.newDescription = '';
  }

  delete(task: Task): void {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  clear(): void {
    this.tasks = [];
  }
}
