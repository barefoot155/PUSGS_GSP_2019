import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/Services/register-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.required],
    Password : ['', Validators.required],
    ConfirmPassword : ['', Validators.required],
    Name : [''],
    Surname : [''],
    PhoneNumber : [''],
    DateOfBirth : [''],
    Address : [''],
    CustomerType : ['']
  });

  constructor(private fb : FormBuilder, private registerService : RegisterServiceService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.registerForm.value);
    this.registerService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
    });
  }

}