import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    Address : ['']
  });

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.registerForm.value);
  }

}
