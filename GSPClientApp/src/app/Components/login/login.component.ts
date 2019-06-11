import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { LoginModel } from 'src/app/Models/loginModel';
import { UserData } from 'src/app/Models/userData';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    UserName : ['', Validators.required],
    Password : ['', Validators.required]
  });

  loggedUser : UserData;

  constructor(private fb : FormBuilder, private loginService : LoginServiceService, private userService: UserServiceService, private router : Router) { }

  ngOnInit() {
    if(this.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmit()
  {
    this.loginService.login(this.loginForm.value as LoginModel).subscribe(data => 
    {
      let jwt = data.access_token;

      let jwtData = jwt.split('.')[1];

      let decodedJwtJsonData = window.atob(jwtData);

      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      let role = decodedJwtData.role;
      console.log('Role:' + role);

      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', this.loginForm.value.UserName);
      localStorage.setItem('role', role);
    
      this.getUserData();
      
    }, 
      err=>console.log('Login failed. Invalid username or password.')
    );
  }

  getUserData()
  {
    this.userService.getUserData(localStorage.getItem("username")).subscribe(
      data => {this.loggedUser = data;
      console.log(this.loggedUser)}
    );
  }

  isLoggedIn(){
    return localStorage.getItem('username') != undefined;
  }
}
