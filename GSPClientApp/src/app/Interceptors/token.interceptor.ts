import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let jwt = localStorage.getItem("jwt");

        if(jwt){
            req = req.clone({
                setHeaders: {
                    "Authorization": "Bearer " + jwt
                }
            });
        }

        return next.handle(req);
    }
}