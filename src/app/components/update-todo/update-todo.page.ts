import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
})
export class UpdateTodoPage implements OnInit {
  editForm: FormGroup;
  id: string;
  spinner: boolean = false;
  loading: boolean = true;

  constructor(private crudService: CrudService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getTask(this.id).subscribe(
      (data) => {
        this.editForm = this.formBuilder.group({
          title: [data['title']],
          description: [data['description']],
        });
        this.loading = false;
      });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
  }

  onUpdate(){    
    this.spinner = true;
    if(!this.editForm.valid){
      console.log('invalid form');
      this.spinner = false;
      return false;
    }else{
      this.crudService.update(this.id, this.editForm.value).finally(
        () => {
          this.spinner = false;
        }
      );
    }
  }
}
