import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewTodo } from '../models/new-todo.model';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoListService {

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  deleteTodo(id: string) {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }

  createTodo(newTodo: NewTodo) {
    return this.http.post<Todo>('http://localhost:3000/todos', newTodo);
  }

  editTodo(updatedTodo: Todo) {
    return this.http.patch(`http://localhost:3000/todos/${updatedTodo.id}`, {
      title: updatedTodo.title,
      isComplete: updatedTodo.isComplete
    });
  }
}


