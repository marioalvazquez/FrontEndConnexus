export class Usuario {
  correo_electronico: string;
  password: string;
  token: string;

  constructor(values: Object = {}){
      Object.assign (this, values);
  }
}
