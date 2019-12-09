import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {UsuarioService} from '../usuario.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (this.usuarioService.isAuthenticated()) {
            this.usuarioService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status === 403) {
          alert('no tine acceso a este recurso');
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }
}
