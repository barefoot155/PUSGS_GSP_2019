import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { LoginModel } from 'src/app/Models/loginModel';

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

  constructor(private fb : FormBuilder, private loginService : LoginServiceService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.loginService.login(this.loginForm.value as LoginModel).subscribe(data => {
      console.log(data);
      console.log(data.access_token);

      let jwt = data.access_token;

      let jwtData = jwt.split('.')[1];
      console.log('jwtData: ' + jwtData);

      let decodedJwtJsonData = window.atob(jwtData);
      console.log('decodedJwtJsonData: ' + decodedJwtJsonData);

      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      console.log('decodedJwtData:'+ decodedJwtData);

      let role = decodedJwtData.role;
      console.log('Role:' + role);

      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', this.loginForm.value.UserName);
      localStorage.setItem('role', role);
    }, 
      err=>console.log('Login failed. Invalid username or password.')
    );
  }
}
