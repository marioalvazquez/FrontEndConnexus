import { Injectable } from '@angular/core';
import { Usuario } from "../models/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { constantes } from "../constants/constantes";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})


export class AutenticacionService {


  constructor(private http: HttpClient) {
  }



  public login(correo_electronico:string, password:string ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

      return this.http.post<{}>(`${constantes.API_URL}login`, {correo_electronico, password}, {
        headers: headers
      })
        .pipe(map(res => this.set_sesion(res)))
          // this is just the HTTP call,
          // we still need to handle the reception of the token
  }

  private set_sesion(resultadoAutenticacion) {
    const expiraEn = moment().add(resultadoAutenticacion.token.expiresIn, 'seconds');

    localStorage.setItem('id_token', resultadoAutenticacion.token.idToken);
    localStorage.setItem('exipra_en', JSON.stringify(expiraEn.valueOf()));
  }

  cerrar_sesion() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("exipra_en");
  }

  public sesionActiva() {
    if (!localStorage.getItem("exipra_en")) return false;
    return moment().isBefore(this.getExpiracion());
  }

  sesionInactiva() {
      return !this.sesionActiva();
  }

  getExpiracion() {
      const expiracion = localStorage.getItem("exipra_en");
      const expiresEn = JSON.parse(expiracion);
      return moment(expiresEn);
  }


}
