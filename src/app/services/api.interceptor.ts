import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    /* private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); */

    constructor(
        public storage: StorageService,
        private api: ApiService,
        private router: Router
    ) {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.indexOf("token/refresh") !== -1) {
            return next.handle(request);
        }

        return from(this.storage.get('token')).pipe(
            mergeMap((token) => {
                
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
        
                if (!request.headers.has('Content-Type')) {
                    request = request.clone({
                        setHeaders: {
                            'content-type': 'application/json'
                        }
                    });
                }
        
                request = request.clone({
                    headers: request.headers.set('Accept', 'application/json')
                });
        
                return next.handle(request).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            //console.log('interceptor event--->>>', event);
                        }
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        switch (error.status) {
                            case 401: case 403:
                                this.router.navigate([!token ? '/' : '/splash']);
                                break;
                        
                            default:
                                return throwError(error);
                        }
                    })
                );
            })
        );
    }

}