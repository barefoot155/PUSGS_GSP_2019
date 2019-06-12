import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

declare var $ : any;

@Injectable({
  providedIn: 'root'
})

export class RealTimeServiceService {
  private proxy: any;  
  private proxyName: string = 'notifications';  
  private connection: any;  
  public connectionExists: boolean; 

  public notificationReceived: EventEmitter<string>;  
  
  constructor() {
    this.notificationReceived = new EventEmitter<string>();
    this.connectionExists = false;  
    // create a hub connection  
    this.connection = $.hubConnection("http://localhost:52295/");
    this.connection.qs = {"token" : "Bearer "+ localStorage.jwt};//"eyJ0eXAiOiJKV1QiLCJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiJ9.eyJuYW1laWQiOiJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiYWRtaW5AeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiZTA2YzY2YTgtZWMwNC00M2UwLTgzNTYtZTAzZjY0MDNjNmM0Iiwicm9sZSI6IkFkbWluIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MjI5NSIsImF1ZCI6ImJXbHNZWE5vYVc0PSIsImV4cCI6MTU1OTU3MzIxMCwibmJmIjoxNTU5NDg2ODEwfQ.uGs1m19mRCf-6ZETmiRGpuhSHgp2eeOHNh0kCxAS2oV5lFQIJjXQPM-QlCyBM9g9irODOmsNTKQXnWLHTqMngA" };
    // create new proxy with the given name 
    this.proxy = this.connection.createHubProxy(this.proxyName); 
   }

  public startConnection(): Observable<boolean> { 
    
    return Observable.create((observer) => {
      
        this.connection.start()
        .done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
            this.connectionExists = true;

            observer.next(true);
            observer.complete();
        })
        .fail((error: any) => {  
            console.log('Could not connect ' + error);
            this.connectionExists = false;

            observer.next(false);
            observer.complete(); 
        });  
      });
  }

  public registerForClickEvents(): void {  
    
    this.proxy.on('userClicked', (data: string) => {  
        console.log('received notification: ' + data);  
        this.notificationReceived.emit(data);  
    }); 
  }  

  public registerForTimerEvents() : Observable<string> {
      
    return Observable.create((observer) => {

        this.proxy.on('setRealTime', (data: string) => {  
            console.log('received time: ' + data);  
            observer.next(data);
        });  
    });      
  }

  public StopTimer() {
      this.proxy.invoke("StopTimeServerUpdates");
  }

  public StartTimer() {
      this.proxy.invoke("TimeServerUpdates");
  }
  
}
