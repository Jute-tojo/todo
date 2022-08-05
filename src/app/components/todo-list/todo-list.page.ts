import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/Todo';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  tasks: Todo[];

  constructor(private crudService: CrudService) {
   }

  ngOnInit() {
    this.crudService.getTasks().subscribe(
      (res) => {
        this.tasks = res.map(
          (data) => {
            return {
              id: data.payload.doc.id,
              ...(data.payload.doc.data() as Todo),
            };
          }
        )
      }
    );
    this.todoList();
  }

  todoList(){
    this.crudService.getTasks().subscribe(
      (data) => {
        //console.log(data);
      }
    )
  }

  onDelete(id: string){
    this.crudService.delete(id);
    console.log('delete');
  }

}
