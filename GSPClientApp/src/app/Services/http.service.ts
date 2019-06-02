import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = "http://localhost:52295/";

  constructor(public http: HttpClient) { 

  }
}
