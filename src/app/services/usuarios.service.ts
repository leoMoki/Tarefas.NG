import { Usuario } from './../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }

  Logar(usuario: Usuario): Promise<Usuario> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let result: Promise<Usuario> = this.http.post<Usuario>("http://localhost:55898/Usuarios/Login", JSON.stringify(usuario), { headers: headers }).toPromise();
    return result
  }

  Insert(usuario: Usuario): Promise<Usuario> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let result: Promise<Usuario> = this.http.post<Usuario>("http://localhost:55898/Usuarios/Insert", JSON.stringify(usuario), { headers: headers }).toPromise();
    return result;
  }

  GetOne(idUsuario: string): Promise<Usuario> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let result: Promise<Usuario> = this.http.get<Usuario>("http://localhost:55898/Usuarios/GetOne?idUsuario="+ idUsuario, { headers: headers }).toPromise();
    return result;
  }

  ExisteAdmin(): Promise<boolean> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let result: Promise<boolean> = this.http.get<boolean>("http://localhost:55898/Usuarios/ExisteAdmin", { headers: headers }).toPromise();
    return result;
  }

}
