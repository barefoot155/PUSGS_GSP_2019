import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/Services/login-service.service';

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
    this.loginService.login(this.loginForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
