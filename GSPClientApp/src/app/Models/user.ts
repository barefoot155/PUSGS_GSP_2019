import { CustomerType } from 'src/app/Models/customerType';

export class User{
    UserName : string;
    Password : string;
    ConfirmPassword : string;
    Email : string;
    Name : string;
    Surname : string;
    PhoneNumber : string;
    Address : string;
    DateOfBirth : string;
    CustomerType : CustomerType;
}