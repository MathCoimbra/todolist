import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    const task: Task = {
      description: this.newTaskDescription,
      completed: false
    };

    this.taskService.create(task).subscribe(() => {
      this.newTaskDescription = '';
      this.loadTasks();
    });
  }

  deleteTask(id: number | undefined) {
    if (id !== undefined) {
      this.taskService.delete(id).subscribe(() => this.loadTasks());
    }
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.taskService.update(task).subscribe(() => this.loadTasks());
  }
}
