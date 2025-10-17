import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs'; // <-- Observable
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
    

  constructor (private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
 
   }

  

  //login user session
  // public loginUser(user:any){
  //   return this.http.post(`${baseUrl}/auth/login`,user,{responseType:'text',withCredentials: true})
        
  // }

//-------------login user JWT-------------------Start---------------
  public loginUser(user:any){
    return this.http.post(`${baseUrl}/auth/login`,user,{responseType:'text'})
        
  }

  storeToken(token: string) {
    if(isPlatformBrowser(this.platformId)){
    return localStorage.setItem('jwtToken', token);
  }
}

   getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
    return localStorage.getItem('jwtToken');
  }
  return null;
}

  //set user
   public setUser(user:any){
   
    localStorage.setItem('user',JSON.stringify(user));

    }

   //get user

   public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      return "User Not Found";
    }
   }
   //get userRoles
   public getUserRole(){
    let user=this.getUser();
    return user[0].profileType; // e.g. "player"
    }
  

   //get userRolesNav
   public getUserRoleNav(){
    let user=this.getUserRole();
    // if (user && user.length > 0) {
    // let role = user[0].profileType; // e.g. "player"
    return user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
  }

  // get All User

  public getUserRoles(): string[] {
  const users = this.getUser();
  const roles: string[] = [];

  if (users && users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const role = users[i].profileType;
      roles.push(role.charAt(0).toUpperCase() + role.slice(1));
    }
  }
  return roles;
}

 


   //Set Use Name::

   //set user
   public setUserName(user:any){
    localStorage.setItem('userName',JSON.stringify(user));
   }

   //get user

   public getUserNameJSON(){
    let userStr=localStorage.getItem("userName");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      return "User Not Found";
    }
   }

    //  get userName
    public getUserName(){
     let user=this.getUserNameJSON();
     return user.charAt(0).toUpperCase()+user.slice(1);
    }




  //get userInfo
  // getUserInfo(): { username: string, roles: string[] } | null {
  //   const token = this.getToken();
  //   if (!token) return null;

  //   try {
  //     const decoded: any = jwt_decode(token);
  //     return {
  //       username: decoded.sub,       // "sub" claim from your JWT
  //       roles: decoded.roles || []   // "roles" claim
  //     };
  //   } catch (err) {
  //     console.error('Invalid JWT', err);
  //     return null;
  //   }
  // }
  
  getCurrentUser(): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // or wherever you store the JWT
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${baseUrl}/dashboard/profiles`, { headers });
}


  logout() {
    if(isPlatformBrowser(this.platformId)){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    //window.location.reload();
    //this.router.navigate(['/login']);
    
    
  }
}

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

//------------------------JWT-----------------END--------- 

  //isLogin
  // public isLogin(){
  //   //return true if user is logged in
  //   //return false if user is not logged in
  //   console.log("inside login");
  //             this.getCurrentUser().subscribe(
  //           (userRoles:any)=>{
  //             console.log(userRoles);
  //             console.log(userRoles.length);

            
  //   },
  //   (error)=>{
  //     console.log(error);
  //     alert('Invaild');
  //   });


    
     
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
  // public getCurrentUser(){
  //   return this.http.get(`${baseUrl}/dashboard/profiles`,{withCredentials: true});
  // }

  // //logout: remove session
  // public logout(){
  //   return this.http.post(`${baseUrl}/auth/logout`,{},{responseType:'text',withCredentials: true}); 
 
  // } 



