import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  pendingTasks:any
  closedTasks:any
  isPendingTaskLoaded:boolean = false
  isClosedTaskLoaded:boolean = false

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getPendingTasks().subscribe((res: any) => {
    this.pendingTasks = res.list;
    if (this.pendingTasks) this.isPendingTaskLoaded = true;
    })

    this.todoService.getClosedTasks().subscribe((res: any) => {
    this.closedTasks = res.list;
      if (this.closedTasks) this.isClosedTaskLoaded = true;
    })
  }

  updateTables(){
    zip(this.todoService.getPendingTasks(),this.todoService.getClosedTasks()).subscribe(([pending, closed]:any) =>{
      this.closedTasks = closed.list;
      this.pendingTasks = pending.list;
    })
  }

  columns = ['id', 'message', 'state', 'image','updateAt','actions'];
  actionIcons = ['30','akar-icons:circle-check','green','CLOSE'];
  actionIcons2 = ['35','ion:arrow-undo-circle-outline','#ffd300','OPEN'];

}
