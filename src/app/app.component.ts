import { Component } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AutenticacionService } from './services/autenticacion.service';
import { Router } from '@angular/router';

//Modelos
import { Usuario } from './models/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loginForm: FormGroup;
  public usuario: Usuario;

  constructor(private fb: FormBuilder,
     private autenticacionService: AutenticacionService,
    private router: Router)
  {
    this.loginForm = fb.group({
      correo_electronico: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  iniciarSesion(){
      this.usuario = this.loginForm.value;
      if (this.usuario.correo_electronico && this.usuario.password) {
          this.autenticacionService.login(this.usuario.correo_electronico, this.usuario.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }
}
