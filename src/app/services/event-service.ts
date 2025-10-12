import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  constructor(private http:HttpClient){}

  // create Event
  public createEvent(event:any){
    return this.http.post(`${baseUrl}/event/create`,event,{responseType:'text'});
  }

  // show Event
  public showEvent(): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get(`${baseUrl}/event/showEvent`,{ headers });
  }

}
