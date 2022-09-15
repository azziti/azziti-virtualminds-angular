import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppConstants } from '../config/app-constants';
import { ToastService } from '../services/toast.service';

@Injectable()
export class Error403Interceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService : ToastService

    ) {}


    // check if jwt token is not expired
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (
              (err.status === 401 || err.status === 403) &&
              this.router.routerState.snapshot.url != '/authentication/login'
            ) {

              this.toastService.showErrorToast("Session expirée !" , "Connectez-vous pour continuer !");
              this.authService.logout();
              this.router.navigate(['/authentication/login']);
            }
          }
        },
      })
    );
  }
}
