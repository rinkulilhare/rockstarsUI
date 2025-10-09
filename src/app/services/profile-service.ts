import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http:HttpClient){}

  //get player profile methods
 
  getPlayerProfile(): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // or wherever you store the JWT
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${baseUrl}/player/profile`, { headers });
  }
  //update player profile method
  
  updatePlayerProfile(dto:any): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // or wherever you store the JWT
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.patch(`${baseUrl}/player/profile`,dto, { headers });
  }


   //get franchise profile methods
 
  getFranchiseProfile(): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // or wherever you store the JWT
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${baseUrl}/franchise/profile`, { headers });
  }

  //update franchise profile method
  
  updateFranchiseProfile(dto:any): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // or wherever you store the JWT
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.patch(`${baseUrl}/franchise/profile`,dto, { headers });
  }

}
