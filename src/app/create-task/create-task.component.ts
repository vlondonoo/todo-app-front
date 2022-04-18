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

  // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File | any; // Variable to store file

  



  ngOnInit(): void {
  }
/*   createTask(newTask:string){
    this.todoService.createTask(newTask).subscribe((res: any) => {console.log('response',res.list)
      
    })
  } */

  onChange(event:any) {
    this.file = event.target.files[0];
    this.file.path = this.profileForm.value.imageData
    //this.profileForm.patchValue({imageData:this.file})
    //console.log('fileeeee',event)
}

// OnClick of button Upload
onUpload() {
  console.log('profileForm',this.profileForm.value)
  // let data = this.parseData(this.profileForm.value)

  // console.log('response', data)
    this.loading = !this.loading;
    console.log('infoooo',this.file);

    const formData = new FormData(); 
  
    
    formData.append("task",this.profileForm.value.task)

    if(this.file){
      formData.append("file", this.file, this.file.name);
      formData.append('path',this.file.path)
    }

    this.todoService.upload(formData).subscribe(
        (event: any) => {
          console.log('--------------------',event)
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;
                this.updateTasks.emit();
                this.loading = false; // Flag variable 

            }
        }
    );
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

