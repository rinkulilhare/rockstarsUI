import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http:HttpClient) { }
  
  //forget password
  public forgetPassword(email:any){
    return this.http.post(`${baseUrl}/auth/forgot-password/${email}`,null,{responseType:'text'});
  }

  //request otp
   public requestOtp(email: string) {
    return this.http.post(`${baseUrl}/auth/requestOTP/${email}`,null, {responseType:'text'});
  }

  //verify otp
  public verifyOtp(email:string,otp:string){
    return this.http.post(`${baseUrl}/auth/verifyOTP/${email}/${otp}`,null,{responseType:'text'});
  }
}
