export class Usuario {
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
  roles: string[] = [];
  exp: number;
}

export class UserToken {
  apellido: string;
  authorities: string[] = [];
  client_id: string;
  email: string;
  exp: number;
  jti: string;
  nombre: string;
  scope: string[] = [];
  user_name: string;
}
