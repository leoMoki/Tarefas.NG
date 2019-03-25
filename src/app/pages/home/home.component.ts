import { Usuario } from './../../models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  usuario: Usuario;

  ngOnInit() {
    let usuario: Usuario = JSON.parse(localStorage.getItem("usuario"));
    this.usuariosService.GetOne(usuario.idUsuario)
    .then(r => {
      this.usuario = r;
      //console.log(this.usuario)
    })
    .catch(r => {
      console.log(r);
    })
  }

  Sair() {
    localStorage.removeItem("idUsuario");
  }

}
