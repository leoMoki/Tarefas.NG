
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario.model';
import { TipoPermissao } from 'src/app/models/tipopermissao';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private messageService: MessageService
  ) { }

  registerForm: FormGroup;
  submitted = false;

  permissao: number = 1;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let usuario: Usuario = new Usuario();
    usuario.Login = this.registerForm.value.login;
    usuario.Senha = this.registerForm.value.password;
    usuario.Email = this.registerForm.value.email;
    usuario.TipoPermissao = this.permissao;

    
    this.AdicionarUsuario(usuario);
  }

  AdicionarUsuario(usuario: Usuario){

    this.usuariosService.Insert(usuario)
    .then(r => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário adicionado com sucesso!' });
    })
    .catch(r => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar usuário' });
    });

    
    this.registerForm.reset();

  }

  Voltar() {
    this.router.navigate(['home']);
  }

}
