import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/Services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService : LoginServiceService) { }

  ngOnInit() {
  }

  logoutClick(){
    this.loginService.logout();
  }

  isAdmin(){
    return localStorage.getItem('role') == "Admin";
  }

  isAppUser(){
    return localStorage.getItem('role') == "AppUser";    
  }

  isController(){
    return localStorage.getItem('role') == "Controller";    
  }
}
