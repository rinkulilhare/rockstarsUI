import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { text } from 'node:stream/consumers';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private isBrowser:boolean;

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId:Object){
    this.isBrowser=isPlatformBrowser(this.platformId);
  }

  // create Event
  public createEvent(event:any):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.post(`${baseUrl}/event/create`,event,{headers,responseType:'text'});
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

  //get Event count
   public getEventCount(){
    return this.http.get<number>(`${baseUrl}/event/count`)
  }

}
