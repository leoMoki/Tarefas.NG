
//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Appcomponent
import { AppComponent } from './app.component';

// PrimeNG
import {DropdownModule} from 'primeng/dropdown';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RadioButtonModule} from 'primeng/radiobutton';


//Pages
import { LoginComponent } from './pages/login/login.component';
import { TarefasListComponent } from './pages/tarefas-list/tarefas-list.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

//Services
import { UsuariosService } from './services/usuarios.service';
import { TarefasService } from './services/tarefas.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    
    //Pages
    LoginComponent,
    TarefasListComponent,
    HomeComponent,
    UsuariosComponent
  ],
  imports: [
    //Angular
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    

    //PrimeNG
    DropdownModule,
    DataTableModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
    RadioButtonModule
    
  ],
  providers: [
    


    UsuariosService,
    TarefasService,

    //PrimeNG
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
