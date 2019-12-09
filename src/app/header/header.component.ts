import {Component} from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'App Angular';

  constructor(
    private usuarioService: UsuarioService
  ) {
  }

  logout() {
    this.usuarioService.logout();
  }
}
