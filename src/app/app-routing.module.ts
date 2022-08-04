import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'create-todo',
    pathMatch: 'full'
  },
  {
    path: 'create-todo',
    loadChildren: () => import('./components/create-todo/create-todo.module').then( m => m.CreateTodoPageModule)
  },
  {
    path: 'update-todo',
    loadChildren: () => import('./components/update-todo/update-todo.module').then( m => m.UpdateTodoPageModule)
  },
  {
    path: 'todo-list',
    loadChildren: () => import('./components/todo-list/todo-list.module').then( m => m.TodoListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
