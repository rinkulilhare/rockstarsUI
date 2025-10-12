import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { text } from 'node:stream/consumers';

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

  //delete Event
  public deleteEvent(eventId:number):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.delete(`${baseUrl}/event/delete/${eventId}`,{responseType:'text'})
  }

  //update Event
  public updateEvent(eventId:number,eventDTO:any):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.patch(`${baseUrl}/event/update/${eventId}`,eventDTO,{responseType:'text'})
  }

}
