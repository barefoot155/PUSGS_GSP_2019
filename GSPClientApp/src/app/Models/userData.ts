import { VerificationStatus } from 'src/app/Models/verificationStatus';
import { CustomerType } from 'src/app/Models/customerType';

export class UserData{
    UserName : string;
    Email : string;
    Name : string;
    Surname : string;
    PhoneNumber : string;
    Address : string;
    DateOfBirth : string;
    CustomerType : CustomerType;
    Status : VerificationStatus;
}