import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    const role = next.data.role as string;
    console.log(role);
    if (this.usuarioService.hasRole(role)) {
      return true;
    }
    alert('no tienes accesso a este recurso');
    this.router.navigate(['/clientes']);
    return false;
  }
}
