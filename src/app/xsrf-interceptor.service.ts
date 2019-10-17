import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpXsrfTokenExtractor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// Checks if browser has CSRF token sent from API to prevent Cross Site Request Forgery
@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = req;
        let token = this.tokenExtractor.getToken() as string;
        if (token !== null) {
            requestToForward = req.clone({ setHeaders: { "XSRF-TOKEN": token } });
        }
        return next.handle(requestToForward);
    }
}