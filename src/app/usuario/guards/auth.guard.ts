import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.usuarioService.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.usuarioService.logout();
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean {
    const time = new Date().getTime() / 1000;
    console.log(this.usuarioService.usuario.exp);
    if (this.usuarioService.usuario.exp < time) {
      return true;
    }
    return false;
  }
}
