import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }
  
  //add user service methods

  public addUser(user:any, role:string){

    return this.http.post(`${baseUrl}/user/register/${role}`,user,{responseType:'text'});

}
}
