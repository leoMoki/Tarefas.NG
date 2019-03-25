import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private messageService: MessageService) { }

  registerForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.CriarUsuarioAdmin();
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
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

    this.usuariosService.Logar(usuario)
      .then(r => {
        localStorage.setItem("usuario", JSON.stringify(r));

        // let teste = localStorage.getItem("usuario");
        // console.log(teste)

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso' });
        this.router.navigate(['home']);
      })
      .catch(r => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao logar no sistema' });
      });

  }

  CriarUsuarioAdmin() {
    let usuario: Usuario = new Usuario();
    usuario.Login = "Admin";
    usuario.Senha = "Admin";
    usuario.Nome = "Administrador";
    usuario.Email = "admin@admin.com";
    usuario.TipoPermissao = 1;


    this.usuariosService.ExisteAdmin()
      .then(r => {
        if (!r) {
          this.usuariosService.Insert(usuario)
            .then(r => {
              console.log("admin criado")
            })
            .catch(r => {

            });
        }
      })
      .catch(r => {

      })




  }

}
