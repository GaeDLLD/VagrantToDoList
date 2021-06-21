import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];

  newTitle: string;
  newDescription: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Task[]>('http://localhost:3000/todos').subscribe(data => this.tasks = data);
  }

  add(): void {
    this.http
      .post<Task>('http://localhost:3000/todos', {title: this.newTitle, desc: this.newDescription, todoListId: 0})
      .subscribe(data => this.tasks.push(data));
    this.newTitle = '';
    this.newDescription = '';
  }

  delete(task: Task): void {
    console.log(task);
    this.http
      .delete<any>('http://localhost:3000/todos/' + task.id, {observe: 'response'}).subscribe(data => {
        if (data.status === 204) {
          const index = this.tasks.indexOf(task);
          this.tasks.splice(index, 1);
        }
    });
  }

  clear(): void {
    this.http.delete('http://localhost:3000/todos/', {observe: 'response'}).subscribe(data => {
      if (data.status === 204) {
        this.tasks = [];
      }
    });
  }
}
