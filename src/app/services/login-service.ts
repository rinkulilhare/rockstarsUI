import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor (private http:HttpClient) { }

  //login user
  public loginUser(user:any){
    return this.http.post(`${baseUrl}/auth/login`,user,{responseType:'text'});
  }
  

}
