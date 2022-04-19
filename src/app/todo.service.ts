import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url:string = 'http://localhost:3001'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": '*' })
  };
  constructor(private http: HttpClient) { }

  getTodos():Observable<object> {
    return this.http.get(`${this.url}/todos`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }
  getPendingTasks():Observable<object> {
    return this.http.get(`${this.url}/todos/pending`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }

  getClosedTasks():Observable<object> {
    return this.http.get(`${this.url}/todos/closed`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }
  getTodosOrdered(id:any):Observable<object> {
    return this.http.get(`${this.url}/todosOrdered`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }
  createTask(newTask:any){
    return this.http.post(`${this.url}/todos`,newTask,this.httpOptions).pipe(
      tap(_ => console.log('reponse')),
      )
  }

  deleteTask(id:any):Observable<object> {
    return this.http.get(`${this.url}/todos/delete/${id}`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }

  updateTask(id:any,state:string):Observable<object> {
    return this.http.get(`${this.url}/todos/update/${id}/${state}`,this.httpOptions).pipe(
      tap(_ => console.log('response')),
      )  
  }

 sortPendingTasks(direction:any){
  return this.http.get(`${this.url}/listOrderedPending/${direction}`,this.httpOptions).pipe(
    tap(_ => console.log('response sort')),
    ) 
 }
 sortClosedTasks(direction:string){
  return this.http.get(`${this.url}/todosOrderedClosed/${direction}`,this.httpOptions).pipe(
    tap(_ => console.log('response sort')),
    ) 
 }
  
  upload(formData:any) { 
    return this.http.post(`${this.url}/todos`,formData).pipe(
      tap(_ => console.log('image uploaded')),) 
  }  
}
