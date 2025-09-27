import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http:HttpClient) { }
  
  //forget password
  public forgetPassword(email:any){
    return this.http.post(`${baseUrl}/auth/forgot-password/${email}`,{responseType:'text'});
  }
}
