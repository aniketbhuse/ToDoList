import { Component, TemplateRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Console } from 'console';
import { Todo } from './module/todo';
import { CommonModule } from '@angular/common';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  todoValue: string = '';

  todoList : Todo[] = [
    /*{
      content: "Todo 1",
      value: false
    },
    {
      content: "Todo 2",
      value: false
    },**/
  ];

  constructor(private modalService: NgbModal){
    
    
  }

  finishedList : Todo[] =[]
  

  addTodo(){
    this.todoList.push({content:this.todoValue, value:false});
    this.todoValue = '';
  }

  changeTodo(i : number){
    const item = this.todoList.splice(i,1);
    console.log(item);
    this.finishedList.push(item[0]);

  }

  changeFinished(i : number){
    const item = this.finishedList.splice(i,1);
    this.todoList.push(item[0]);
  }

  RemoveList(i:number){}

  openModal(content: TemplateRef<Element>, i: number, type: string){
    this.modalService.open(content, {ariaLabelledBy: 'model-basic-title'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        }else{
          this.finishedList.splice(i,1);
        }
      },
      (reason)=>{

      }
    )

  }
}
