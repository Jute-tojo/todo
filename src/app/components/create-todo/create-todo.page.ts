import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  todoForm: FormGroup;
  spinner: boolean = false;

  constructor(private crudService: CrudService, public formBuilder:FormBuilder, private router: Router) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });
  }

  onSubmit(){
    this.spinner = true;
    if(!this.todoForm.valid){
      console.log('invalid form');
      return false;
    }else{
      this.crudService.create(this.todoForm.value).then(
        () => {          
          this.todoForm.reset();
          this.router.navigate(['/todo-list']);
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      ).finally(
        () => {
          this.spinner = false;
        }
      )
    }
  }
}
