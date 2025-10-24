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

  public getUsers(){
    return this.http.get(`${baseUrl}/user/userList`,{responseType:'text'})
  }

   public getUserCount(){
    return this.http.get<number>(`${baseUrl}/user/count`)
  }

  public getUsersHavingFranchise(){
    return this.http.get(`${baseUrl}/user/listFranchise`,{responseType:'text'})
  }

  public updateUserEmailById(user:any, userId:number){
    return this.http.patch(`${baseUrl}/user/updateMail/${userId}`,user,{responseType:'text'})
  }

  public deleteUserById(userId:number){
    return this.http.delete(`${baseUrl}/user/delete/${userId}`,{responseType:'text'})
  }
  
}
