import {Component, OnInit} from '@angular/core';
import {Usuario} from '../usuario';
import {UsuarioService} from '../usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.usuarioService.isAuthenticated()) {
      alert('ya esta autenticado');
      this.router.navigate(['/clientes']);
    }
  }

  login() {
    if (this.usuario.username == null || this.usuario.password == null) {
      alert('ingrese datos');
      return null;
    }
    this.usuarioService.login(this.usuario).subscribe(
      response => {
        this.usuarioService.guardarToken(response.access_token);
        this.usuarioService.guardarUsuario(response.access_token);
        console.log(this.usuarioService.usuario);
        this.router.navigate(['/clientes']);
      },
      error => {
        if (error.status == 400) {
          alert('error de autenticación');
        }
      }
    );
  }
}
