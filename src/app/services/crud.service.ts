import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private ngFirestore: AngularFirestore, private router: Router) { }

  create(todo: Todo){
    return this.ngFirestore.collection('tasks').add(todo);
  }

  getTasks(){
    return this.ngFirestore.collection('tasks').snapshotChanges();
  }

  getTask(id : string){
    return this.ngFirestore.collection('tasks').doc(id).valueChanges();
  }

  update(id: string, todo: Todo){
    return this.ngFirestore.collection('tasks').doc(id)
      .update(todo).then(
        () => {
          this.router.navigate(['/todo-list'])
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  delete(id: string){
    return this.ngFirestore.doc('tasks/'+id).delete();
  }
}
