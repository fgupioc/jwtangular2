import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserToken, Usuario} from './usuario';
import {Router} from '@angular/router';

export interface ResponseOauth {
  access_token: string;
  apellido: string;
  email: string;
  expires_in: number;
  jti: string;
  nombre: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:8080/oauth/token';

  private _token: string;
  private _usuario: Usuario;

  constructor(
    private  http: HttpClient,
    private router: Router
  ) {
  }

  login(usuario: Usuario): Observable<any> {
    const credenciales = btoa('angularapp' + ':' + '12345');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<null>(this.url, params.toString(), {headers: headers});
  }

  private convertObjectUserToken(access_token: string): UserToken {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  guardarToken(access_token: string) {
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
  }

  guardarUsuario(access_token: string) {
    const userToken: UserToken = this.convertObjectUserToken(access_token);
    this._usuario = new Usuario();
    this._usuario.nombre = userToken.nombre;
    this._usuario.apellido = userToken.apellido;
    this._usuario.email = userToken.email;
    this._usuario.username = userToken.user_name;
    this._usuario.roles = userToken.authorities;
    this._usuario.exp = userToken.exp;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const userToken: UserToken = this.convertObjectUserToken(this.token);
    if (userToken != null && userToken.user_name && userToken.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout() {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  hasRole(role: string) {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
