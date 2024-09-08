/*import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../app/service/auth-service.service';
import { Observable } from 'rxjs';


@Injectable()
// Interceptor pour inclure le token dans les en-têtes des requêtes sortantes
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      // Cloner la requête et inclure le token dans les en-têtes Authorization
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
     /*   }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
*/
