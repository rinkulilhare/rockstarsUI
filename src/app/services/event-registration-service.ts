import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService {
  private isBrowser:boolean;
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId:Object){
    this.isBrowser=isPlatformBrowser(this.platformId);
  }


  // create EventRegistration
  public createEventRegistration(eventId:number,eventRegistration:any):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.post(`${baseUrl}/event-reg/registration/${eventId}`,eventRegistration,{headers,responseType:'text'});
  }

  // show EventRegistration
  public showAllEventRegistration(): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get(`${baseUrl}/event-reg/showAllEventReg`,{ headers });
  }


   // show EventRegistration By EventId
  public showAllEventRegistrationByEventId(eventId:number): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get(`${baseUrl}/event-reg/getAllRegDetailsByEvent/${eventId}`,{ headers });
  }

  // getEventRegByEventIDAndProfileId
  public getEventRegistrationByEventIdAndProfileId(eventId:number,profileId:number):Observable<any>{
    const token = localStorage.getItem('jwtToken');
     const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get(`${baseUrl}/event-reg/getByEidAndPPid/${eventId}/${profileId}`,{headers})
  }


  //delete EventRegistration
  public deleteEventRegistration(eventRegistrationId:number):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.delete(`${baseUrl}/event-reg/delete/${eventRegistrationId}`,{responseType:'text'})
  }

  
  //update EventRegistration
  public updateEventRegistration(eventRegistrationId:number,eventRegistrationDTO:any):Observable<any>{
    const token=localStorage.getItem('jwtToken');
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.patch(`${baseUrl}/event-reg/update/${eventRegistrationId}`,eventRegistrationDTO,{responseType:'text'})
  }


  //get RegistrationEvent BY ProfileID and EventID

    getAllEventRegistrations(): Observable<any> {
      const token=localStorage.getItem('jwtToken');
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    })
    return this.http.get(`${baseUrl}/event-reg/getAllEventProfilIds`,{ headers});
  }

  //get Event-Reg count
   public getEventRegCount(){
    return this.http.get<number>(`${baseUrl}/event-reg/count`)
  }




}
