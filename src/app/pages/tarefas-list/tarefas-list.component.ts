import { TarefasService } from './../../services/tarefas.service';
import { Tarefa } from './../../models/tarefa.model';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tarefas-list',
  templateUrl: './tarefas-list.component.html',
  styleUrls: ['./tarefas-list.component.css'],
  animations: [
    trigger("fade", [
      state('in', style({ opacity: '0' })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(200, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class TarefasListComponent implements OnInit {

  constructor(
    private tarefasService: TarefasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  tarefa: Tarefa;
  tarefas: Tarefa[] = [];
  colunas: any[];
  selTarefas: Tarefa[];

  detalhesVisible: boolean = false;
  novaTarefa: boolean = false;

  ngOnInit() {

    this.colunas = [
      { field: 'Nome', header: 'Tarefa' },
      { field: 'Concluida', header: 'Concluída' },
    ];

    //this.tarefas = this.getTarefas();
    this.getTarefas();
  }

  getTarefas() {

    this.tarefasService.GetAll()
      .then(result => {
        this.tarefas = result;
      })
      .catch(result => {

      })

  }

  // tarefaSelected(event: any): void {
  //   this.novaTarefa = false;
  //   this.tarefa = this.cloneTarefa(event.data);
  //   this.detalhesVisible = true;
  // }

  onRowSelect(event: any): void {

    this.tarefa = this.cloneTarefa(event.data);

    if (!this.tarefa.Concluida) {
      this.confirmationService.confirm({
        message: 'Concluir esta tarefa?',
        accept: () => {
          this.tarefa.Concluida = true;
          this.UpdateTarefa(this.tarefa);
        },
      });
    }
  }

  cloneTarefa(t: Tarefa): Tarefa {
    let tarefa = new Tarefa();
    for (let prop in t) {
      tarefa[prop] = t[prop];
    }
    return tarefa;
  }

  Editar(tarefa: Tarefa) {
    this.tarefa = tarefa;
    this.detalhesVisible = true;
  }

  showDialogToAdd(): void {
    this.detalhesVisible = true;
    this.novaTarefa = true;
    this.tarefa = new Tarefa();
  }

  save() {

    if (this.novaTarefa) {
      this.InsertTarefa(this.tarefa);
    }
    else {
      this.UpdateTarefa(this.tarefa);
    }
    this.tarefa = null;
    this.detalhesVisible = false;
  }

  Delete(idTarefa: string) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja realizar esta operação?',
      accept: () => {
        this.DeleteTarefa(idTarefa);
        this.detalhesVisible = false;
      },
      reject: () => {
        this.detalhesVisible = false
      }
    });

  }


  InsertTarefa(tarefa: Tarefa) {
    this.tarefasService.Insert(tarefa)
      .then(r => {
        this.tarefas.push(r);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa adicionada com sucesso' });
        this.getTarefas();
      })
      .catch(r => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar tarefa' });
      });
  }

  UpdateTarefa(tarefa: Tarefa) {
    this.tarefasService.Update(tarefa)
      .then(r => {
        //this.tarefas[this.tarefas.indexOf(this.selTarefa)] = r;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa atualizada com sucesso' });
        this.getTarefas();
      })
      .catch(r => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar tarefa' });
      })
  }

  DeleteTarefa(idTarefa: string) {
    this.tarefasService.Delete(idTarefa)
      .then(r => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa removida com sucesso' });
        this.getTarefas();
      })
      .catch(r => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover tarefa' });
      });
  }


}
