import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userdata:FormGroup[] = [];
  constructor() { }

  userRegister(user:FormGroup){
    this.userdata.push(user);
    return "success"
  }
}
