import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  activeUser:number=0;
  
  constructor (private http:HttpClient) { }

  

  //login user
  public loginUser(user:any){
    return this.http.post(`${baseUrl}/auth/login`,user,{responseType:'text',withCredentials: true})
        
  }

  //isLogin
  public isLogin(){
    //return true if user is logged in
    //return false if user is not logged in
    console.log("inside login");
              this.getCurrentUser().subscribe(
            (userRoles:any)=>{
              console.log(userRoles);
              console.log(userRoles.length);

             this.activeUser=userRoles.length;
    },
    (error)=>{
      console.log(error);
      alert('Invaild');
    });


    
     
}




    // if(this.getCurrentUser()!=Object && this.getCurrentUser()!=undefined)
    //   {
        
    //     // const user=this.getCurrentUser().subscribe((res:any)=>{
    //     //   res.forEach((u:any)=>{
    //     //     console.log(u.profileType);
    //     //   });
    //     // });
    //    console.log("inside login::true");
    //   return true;
    //   }else{
    //     console.log("inside login::false");
    //     return false;
    //   } 

  
  //for getting current user profile    
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/dashboard/profiles`,{withCredentials: true});
  }

  //logout: remove session
  public logout(){
    return this.http.post(`${baseUrl}/auth/logout`,{},{responseType:'text',withCredentials: true}); 
 
  } 

}
  

