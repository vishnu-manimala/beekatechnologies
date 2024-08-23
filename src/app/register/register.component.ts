import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerFrom! : FormGroup;
  passwordMatchError: string = "";

  constructor(private fb:FormBuilder, private userService: UserService){}

  ngOnInit(): void {
   
    this.registerFrom = this.fb.group({
        name:new FormControl("", [Validators.required]),
        email: new FormControl("",[Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=.*\\S).{8,20}$')]),
        confirmPassword : new FormControl("",[Validators.required] )
    })   
  }

  passwordMatchValidator(){
    const password = this.registerFrom.get('password')?.value;
    const confirmPassword = this.registerFrom.get('confirmPassword')?.value;
    console.log(password, confirmPassword);
    if(password !== confirmPassword ){
      this.passwordMatchError = "Passwords not matching";
    }else{
      this.passwordMatchError = "";
    }
  }

  onSubmit(){
    if(this.registerFrom.valid){
      const reg = this.userService.userRegister(this.registerFrom.value);
      if(reg === "success"){
        alert("registered succesfully!")
      }
    }
  }
}
