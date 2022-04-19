import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Output() updateTasks = new EventEmitter<string>();
  constructor(private fb: FormBuilder,private todoService:TodoService) { }

  profileForm = this.fb.group({
    task: ['', Validators.required],
    imageData: ['']
  });
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File | any; // Variable to store file

  ngOnInit(): void {
  }

  onChange(event:any) {
    this.file = event.target.files[0];
    this.file.path = this.profileForm.value.imageData;
  }


  onUpload() {
      this.loading = !this.loading;
      const formData = new FormData();     
      formData.append("task",this.profileForm.value.task);

      if(this.file){
        formData.append("file", this.file, this.file.name);
        formData.append('path',this.file.path);
      }

      this.todoService.upload(formData).subscribe(
          (event: any) => {
            if (typeof (event) === 'object') {
                this.shortLink = event.link;
                this.updateTasks.emit();
                this.loading = false;
            }
          });
  }

  parseData( formValue:any ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}

